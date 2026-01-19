import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-section',
  imports: [CommonModule],
  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.css'
})
export class BannerSectionComponent {
  @Input() items:any[]=[];
  @Input() title:string="";
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('items',this.items);
  }
}
