import { Component, Input,ViewChild,ElementRef } from '@angular/core';
import { SliderServiceService } from '../../../Services/slider-service.service';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-section',
  imports: [MainSliderComponent,CommonModule],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {
  constructor(private service:SliderServiceService){}


  @Input() lazy:boolean=true;
  @Input() type!:string;
  @Input() id!:number;
  @ViewChild('sectionMain') sectionRef!: ElementRef;



  slider:any =[];
  loading = true;




  ngAfterViewInit(): void {
    if(!this.id){return console.log('Salamlar main')}

    if (this.lazy) {
      this.observe();
    } else {
      this.getItems();
    }
    
  }

  getItems(){
    this.service.getSlider(this.id).subscribe({
      next:(res)=>{
        console.log('response kanki',res);
        this.slider=res.data;
        console.log(this.slider)
        this.loading=false;
      },
      error:(err)=>{
        console.log('error kanki',err)
      }
    })
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


}
