import { Component, Input,ViewChild,ElementRef,SimpleChanges, TransferState, makeStateKey } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAware } from '../../../base/browser-aware';
import { BannerSliderComponent } from '../../sliders/banner-slider/banner-slider.component';
import { SliderServiceService } from '../../sliders/slider-service.service';
@Component({
  selector: 'app-banner-section',
  imports: [CommonModule,BannerSliderComponent],
  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.css'
})
export class BannerSectionComponent extends BrowserAware{
  constructor(private service:SliderServiceService,
    private transferState: TransferState
  ){super()}
  
  @Input() lazy:boolean=false;
  @Input() type!:string;
  @Input() id!:number;
  @Input() sort!: number;
  @ViewChild('bannerSection') sectionRef!: ElementRef;



  banner: any = null;
  loading = true;
  private loaded = false;

  private getKey() {
    return makeStateKey<any>('slider-' + this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // SSR'da id geldiği anda çalışır
    if (!this.isBrowser() && this.sort <3) {
      this.loaded = true;
      this.getItems();
    }
  }

  ngAfterViewInit(): void {
    if(!this.isBrowser()) return;
    if (!this.id) return;
    if (this.loaded) return;
    if (this.banner) return;
    this.lazy ? this.observe() : this.getItems();

    
  }
  
  getItems(){
    const KEY = this.getKey();
    if (this.isBrowser()) {

      const saved = this.transferState.get(KEY, null);

      if (saved) {
        console.log("TransferState kullanıldı BANNER");
        this.banner = saved;
        this.loading = false;
        this.transferState.remove(KEY);
        return;
      }

    }

    this.service.getSlider(this.id).subscribe({
      next:(res)=>{
        console.log('response kanki banner section ',res);
        this.banner=res.data;
        console.log(this.banner)
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
