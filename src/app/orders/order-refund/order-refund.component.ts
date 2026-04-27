import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // EKLENDİ: ngModel için gerekli
import { OrderService } from '../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItems } from '../../interfaces/order/order-items';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { FullpageLoaderComponent } from '../../shared/fullpage-loader/fullpage-loader.component';
// Arayüzü frontend ihtiyaçlarına göre genişletiyoruz
export interface OrderItemRefund extends OrderItems {
  selectedForReturn: boolean;
  returnQty: number;
}

@Component({
  selector: 'app-order-refund',
  imports: [CommonModule, FormsModule,MainToastComponent,FullpageLoaderComponent], // EKLENDİ: FormsModule
  templateUrl: './order-refund.component.html',
  styleUrl: './order-refund.component.css'
})
export class OrderRefundComponent implements OnInit {
  id!: number;
  orderItems: OrderItemRefund[] = []; // Genişletilmiş arayüzü kullanıyoruz

  constructor(private service: OrderService, private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')) || 0;
      if (this.id) {
        this.getPage();
      }
    });
  }

  getPage() {
    this.service.getRefundPage(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        // Backend'den gelen veriye default UI statelerini ekliyoruz
        this.orderItems = res.data.map((item: OrderItems) => ({
          ...item,
          selectedForReturn: false,
          returnQty: 1 // Seçilirse en az 1 tane iade edecek varsayıyoruz
        }));
      },
      error: (err) => {
        console.error('İade sayfası yüklenirken hata:', err);
      }
    });
  }
  
  // Checkbox'a tıklanınca çalışır
  selectItem(item: OrderItemRefund) {
    item.selectedForReturn = !item.selectedForReturn;
    
    // Eğer seçimi kaldırdıysa adeti geri 1'e sıfırlıyoruz ki temiz kalsın
    if (!item.selectedForReturn) {
      item.returnQty = 1;
    }
  }

  // Miktar Artırma
  increaseQty(item: OrderItemRefund) {
    if (item.returnQty < item.available_quantity) {
      item.returnQty++;
    }
  }

  // Miktar Azaltma
  decreaseQty(item: OrderItemRefund) {
    if (item.returnQty > 1) {
      item.returnQty--;
    }
  }

  // Kullanıcı inputa elle sayı girerse kontrol ediyoruz
  validateQty(item: OrderItemRefund) {
    // String falan girilirse veya boş bırakılırsa 1 yap
    if (!item.returnQty || item.returnQty < 1) {
      item.returnQty = 1;
    } 
    // Mevcut stoktan fazla yazmaya çalışırsa max değere eşitle
    else if (item.returnQty > item.available_quantity) {
      item.returnQty = item.available_quantity;
    }
  }

  // İleride işine yarayacak bonus: Toplam İade Tutarını Hesaplama
  get totalRefundAmount(): number {
    return this.orderItems
      .filter(item => item.selectedForReturn)
      .reduce((total, item) => total + (item.price * item.returnQty), 0);
  }


  toastMessage?:string; 
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  refundReason!:string; 
  fullPageLoader=false;
  submitReturn() {
    this.toastMessage=undefined;
    // Sadece seçili olanları filtrele ve backend'in istediği formata dönüştür
    const itemsToReturn = this.orderItems
      .filter(item => item.selectedForReturn)
      .map(item => ({
        item_id: item.id,            // Backend'in beklediği: order_items.*.item_id
        quantity: item.returnQty     // Backend'in beklediği: order_items.*.quantity
      }));

    // Boş veri gönderip 422 hatası almamak için frontend önlemi
    if (itemsToReturn.length === 0) {
      this.toastMessage='İade edilecek ürünleri seçiniz.';
      this.status='error';
      return;
    }

    if (!this.refundReason || this.refundReason.trim() === '') {
      this.toastMessage='İade Sebebi belirtiniz.';
      this.status='error';
      return;
    }

    // Backend'in beklediği ana payload (order_items ve reason)
    const payload = {
      order_items: itemsToReturn, 
      reason: this.refundReason
    };
    this.fullPageLoader=true;
    this.service.createRefundRequest(this.id,payload).subscribe({
      next:(res)=>{
        console.log(res)
        this.fullPageLoader=false;
        this.router.navigate([`/hesabim/siparislerim/${this.id}`]);
      },
      error:(err)=>{
        this.fullPageLoader=false;
        console.log(err);
        this.status='error';
        this.toastMessage=err.error.message;
      }
    })

    // this.apiService.createReturn(this.id, payload).subscribe(...)
  }
}

