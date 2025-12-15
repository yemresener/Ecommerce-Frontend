import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentServiceService } from '../Services/payment-service.service';
import { CommonModule } from '@angular/common';
import {
  Stripe,
  StripeCardElement,
  StripeElements,
  StripeElementsOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private http:HttpClient, private payment:PaymentServiceService){}
  @ViewChild('cardInfo') cardInfo!: ElementRef<HTMLDivElement>;

  stripe:Stripe|null=null;
  elements:StripeElements | null=null;
  card!:StripeCardElement;
  cardErrors:string='';
  paymentMessage:string='';
  loading = false;
  customerName = ''; 





  async setupCardElement() {
    if (!this.stripe) return;

    // Elements opsiyonları (isteğe bağlı stil)
    const elementsOptions: StripeElementsOptions = {
      locale: 'tr'
    };

    this.elements = this.stripe.elements(elementsOptions);

    this.card = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          '::placeholder': { color: '#a0aec0' },
          fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial'
        },
        invalid: { color: '#fa755a' }
      },
      hidePostalCode: true
    });

    this.card.mount(this.cardInfo.nativeElement);

    // Gerçek zamanlı validasyon
    this.card.on('change', (event) => {
      this.cardErrors = event.error ? event.error.message ?? '' : '';
    });
  }






  async ngOnInit(){
    this.stripe = await this.payment.initStripe('pk_test_51SLRSx4CnKn7VYYXyAR7kd2qdw59vlREtXoPRrLbhNDxUSGoSQymSjg5xfv1afn2NdssZlTsFHwaDbfVsIuEsm6600u9j5e6IA');
    this.setupCardElement();
  }

  async pay(){
    if(!this.stripe||!this.card){
      this.paymentMessage='Stripe Başlatılamadı';
      return;
    }
    try{
      this.loading = true;
      this.paymentMessage = '';
    
    const res:any = await this.payment.createPayment();
    const clientSecret=res.client_secret;

    
    if (!clientSecret) {
      this.paymentMessage = 'Sunucudan client_secret alınamadı.';
      return;
    }
    
    const result = await this.stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:this.card,
        billing_details:{
          name:this.customerName||'Müşteri'
        }
      }
    })

   // const{paymentIntent,error}=await this.payment.confirmPayment(clientSecret,cardElement,'emre Ener');

   if (result.error) {
    // Örnek: kart reddedildi, 3D Secure reddi vs.
    this.paymentMessage = `Ödeme hatası: ${result.error.message}`;
  } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
    // Kullanıcıya anlık bildir
    this.paymentMessage = 'Ödeme başarılı! 🎉';
    // Sipariş güncellemesi backend tarafından webhook ile yapılacaktır.
  } else {
    this.paymentMessage = 'Ödeme durumu: ' + (result.paymentIntent?.status ?? 'bilinmiyor');
  }

  }catch (err) {
    this.paymentMessage = 'Ödeme sırasında bir hata oluştu.';
    console.error(err);
  } finally {
    this.loading = false;
  }
  }

  ngOnDestroy() {
    // cleanup
    try {
      if (this.card) this.card.destroy();
    } catch (e) { /* ignore */ }
  }























  login:string = "";
  password:string="";


  loginFunc(){
    this.http.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true,headers: {
      'Accept': 'application/json',
    } }).subscribe({
      next:(res)=>{
        console.log(res);
        this.tryToLogin();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  infoFunc(){
    this.http.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true,headers: {
      'Accept': 'application/json'
    } }).subscribe(() => {
      this.tryToGetInfo();
    });
  }

  tryToLogin(){
    console.log('sa');
    const body={
      login:this.login,
      password:this.password
    }
    this.http.post('http://localhost:8000/api/login',body,{ withCredentials: true,headers: {
    } }).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  tryToGetInfo(){
    this.http.get('http://localhost:8000/api/getProducts',{withCredentials:true}).subscribe({
      next:(res)=>{
        console.log(res);

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
