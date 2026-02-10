import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() item:any;
  @Input() itemSize:number=0;
  @Input() skeleton:boolean=false;

}
