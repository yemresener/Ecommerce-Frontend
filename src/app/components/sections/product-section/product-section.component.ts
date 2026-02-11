import { Component,Input,ViewChild,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSliderComponent } from '../product-slider/product-slider.component';
import { SliderServiceService } from '../../../Services/slider-service.service';

@Component({
  selector: 'app-product-section',
  imports: [CommonModule,ProductSliderComponent],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
    constructor(private service:SliderServiceService){}
  
  @Input() lazy:boolean=true;
  @Input() type!:string;
  @Input() id!:number;
  @ViewChild('sectionProduct') sectionRef!: ElementRef;



  slider:any =[];
  loading = true;




  ngAfterViewInit(): void {
    if (this.lazy) {
      this.observe();
    } else {
      this.getItems();
    }
    
  }

  observe(){
    const observer= new IntersectionObserver(enter=>{
      if(enter[0].isIntersecting){
        this.getItems();
        observer.disconnect();

      }
    })
    observer.observe(this.sectionRef.nativeElement);

  }

  getItems(){
    this.service.getSlider(this.id).subscribe({
      next:(res)=>{

        console.log('response product',res);
        this.slider=res.data;
        console.log(this.slider)
        this.loading=false;
      },
      error:(err)=>{
        console.log('error kanki',err)
      }
    })
  }

}
