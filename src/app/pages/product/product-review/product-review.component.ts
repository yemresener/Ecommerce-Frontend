import { Component,Input,SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Advert } from '../../../interfaces/advert';
@Component({
  selector: 'app-product-review',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent {
  commentPopUp = 0;

  @Input() addCart:boolean=false;
  @Input() advert!:Advert;

  

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['advert']){
      console.log('advert kankam',this.advert);
    }
  }

  rating=0;
  hoverRating=0;

  setRating(value:number){
    this.rating=value;
  }
  setHover(value:number){
    this.hoverRating=value;
  }
  clearHover(){
    this.hoverRating=0;
  }

}
