import { Component,Input,Output,EventEmitter } from '@angular/core';
import { MiniAdvert } from '../interfaces/mini-advert';
import { CardComponent } from '../shared/components/product/card/card.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-items',
  imports: [CardComponent,CommonModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent  {

  @Input() pages: { page: number; items: MiniAdvert[] }[] = [];
  @Input() isLoading = false;
  @Input() minPageLoaded = 1;

  @Output() loadPrevious = new EventEmitter<void>();
  @Output() pageInView = new EventEmitter<number>();



  
  
}
