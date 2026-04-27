import { Component,HostListener, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-review-list',
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  @Input() reviews!:Review[]
  @Input() isLoading: boolean = true;
  
  @Output() goToAdvert = new EventEmitter<string>();
  @Output() delete = new EventEmitter<Review>();

  
  activeReview?:Review;
  toggleMenu(review:Review,event:Event){
    event.stopPropagation();

    if(this.activeReview===review) {
      this.activeReview=undefined;
      return;
    }
    this.activeReview=review
  }
  deleteComment(review:Review){
    this.delete.emit(review);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    if (this.activeReview) {
      this.activeReview = undefined;
    }
  }

}
