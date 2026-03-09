import { Component, Input,ViewChild,ElementRef,PLATFORM_ID, inject,TransferState, makeStateKey  } from '@angular/core';
import { SliderServiceService } from '../../../Services/slider-service.service';
import { CommonModule } from '@angular/common';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-category-section',
  imports: [CommonModule,CategorySliderComponent],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent {
  constructor(private service:SliderServiceService,
    private transferState: TransferState
  ){}
  private platformId = inject(PLATFORM_ID);
  private isBrowser() { return isPlatformBrowser(this.platformId); }

  @Input() lazy:boolean=false;
  @Input() type!:string;
  @Input() id!:number;
  @Input() sort!:number;

  @ViewChild('categorySection') sectionRef!: ElementRef;

  slider:any =[];
  loading = true;

  private getKey() {
    return makeStateKey<any>('slider-' + this.id);
  }

  ngOnInit(): void {
    if (!this.isBrowser() && this.sort <3) {
      this.getItems(); 
    }
  }


  ngAfterViewInit(): void {
    if (!this.isBrowser()) return

    if(!this.id){return console.log('Salamlar')}

    if (this.lazy) {
      this.observe();
    } else {
      this.getItems();
    }
    
  }
  
  getItems(){
    const KEY = this.getKey();
    if (this.isBrowser()) {

      const saved = this.transferState.get(KEY, null);

      if (saved) {
        console.log("TransferState kullanıldı CATEGORY SECTION");
        this.slider = saved;
        this.loading = false;
        this.transferState.remove(KEY);
        return;
      }

    }
    this.service.getSlider(this.id).subscribe({
      next:(res)=>{
        console.log('response kanki',res);
        this.slider=res.data;
        console.log(this.slider)
        if (!this.isBrowser()) {
          this.transferState.set(KEY, res.data);
        }
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
