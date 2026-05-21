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
import { CommonModule } from '@angular/common';
import {
  Stripe,
  StripeCardElement,
  StripeElements,
  StripeElementsOptions
} from '@stripe/stripe-js';

import { ProductServiceService } from '../Services/product-service.service';

import { Feature } from '../features/product/interfaces/feature';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private http:HttpClient,  private productService:ProductServiceService){}
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
    
    const clientSecret='qwe';

    
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

  featureList: Feature[] = [
    { key: 'tahilsiz', label: 'Tahılsız' },
    { key: 'kisir-destegi', label: 'Kısır Desteği' },
    { key: 'premium', label: 'Premium' },
    { key: 'hassas-sindirim', label: 'Hassas Sindirim' },
    { key: "kisirlestirilmis", label: "Kısırlaştırılmış Kediler İçin" },
    { key: "ideal-kilo", label: "İdeal Kilo Kontrolü" },
    {key:"dengeli",label:"Dengeli Beslenme"},
    { key: "dusuk-yagli", label: "Düşük Yağ Oranı" },
    { key: "idrar-destegi", label: "İdrar Yolu Sağlığı" },
    { key: "yuksek-protein", label: "Yüksek Protein" },
    { key: "parlak-tuy", label: "Parlak Tüy Desteği" },
    { key: "bagisiklik", label: "Bağışıklık Güçlendirici" },
    { key: "indoor", label: "Ev Kedileri İçin" },
    { key: "tuy-topagi", label: "Tüy Yumağı Kontrolü" },
    { key: "koku-kontrol", label: "Dışkı Koku Kontrolü" },
    { key: "pirincli", label: "Pirinçli" },
    { key: "ekonomik", label: "Ekonomik Paket" },
    { key: "tavuklu", label: "Tavuklu" },
    { key: "serbest-gezen-tavuk", label: "Serbest Gezen Tavuk" },
    { key: "coklu-balik", "label": "6 Çeşit Balık" },
    { key: "omega-3", label: "Omega 3 & 6" },
    {key:"kas",label:"Kas Gelişimi"},
    {key:"veteriner",label:"Veteriner Formülü"},
    {key:"kalp",label:"Kalp Sağlığı"},
    {key:"tartar",label:"Diş ve Ağız Sağlığı"},






  ];



  name:string='';
  category_id?:number;
  price?:number;
  stock?:number;
  image: File[] = [];
  features:Feature[]=[];

  toggleFeature(f: Feature) {
    const index = this.features.findIndex(x => x.key === f.key);
  
    if (index > -1) this.features.splice(index, 1);
    else this.features.push(f);
    console.log(this.features)
  }

  isSelected(f: Feature): boolean {
    return this.features.some(x => x.key === f.key);
  }
 addImage(event:any){
  const files: FileList = event.target.files;
  this.image = Array.from(files); 
  console.log(this.image)
 }

  createProduct(){
    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('category_id', String(this.category_id));
    formData.append('price', String(this.price));
    formData.append('stock', String(this.stock));
    formData.append('features',JSON.stringify(this.features));
    this.image.forEach(file=>{
      formData.append('image[]',file);
    });

    this.productService.createProduct(formData).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error(err) {
        console.log(err)
      },
    })
    console.log(this.image);
    }
  







    title:string='';
    campaignImage!: File;
    campaignMobileImage!:File;

    onFileSelected(event: any,image:string|null=null) {
      const file = event.target.files[0];
      if (file && image==='main') {
        return this.campaignImage = file;
      }
      this.campaignMobileImage=file;
      console.log(this.campaignImage  )
    }
    
    createCampaign(){
      const formData= new FormData();
      formData.append('title',this.title);
      formData.append('image',this.campaignImage)
      if(this.campaignMobileImage) formData.append('mobile_image',this.campaignMobileImage);
      console.log(formData);
      const url = `http://127.0.0.1:8000/api/createCampaign`;
      this.http.post(url,formData,{withCredentials:true}).subscribe({
        next:(res)=>{
          console.log(res)
  
        },
        error(err) {
          console.log(err)
        },
      }) 
    }

    categoryName!:string;
    parentId!:string;
    createCategory(){
      const formData = new FormData();
      formData.append('name',this.categoryName);
      formData.append('image',this.campaignMobileImage ?? null);
      formData.append('parent_id',this.parentId);
      const url = `http://127.0.0.1:8000/api/createCategory`;
      this.http.post(url,formData,{withCredentials:true}).subscribe({
        next:(res)=>{
          console.log(res);

        },
        error:(err)=>{
          console.log(err);
        }
      })
    }














    email:string = "";
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
      email:this.email,
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
    this.http.get('http://e-commerce.test/api/getProducts',{withCredentials:true}).subscribe({
      next:(res)=>{
        console.log(res);

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
