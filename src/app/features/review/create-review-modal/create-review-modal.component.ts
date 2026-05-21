import { Component,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface body{
  rating:number,
  commentText:string
}

@Component({
  selector: 'app-create-review-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './create-review-modal.component.html',
  styleUrl: './create-review-modal.component.css'
})

export class CreateReviewModalComponent {

  @Output() close = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<body>();

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
  commentText='';
  confirmButton(){
    if(this.rating<=0) return;

    const body:body={rating:this.rating,commentText:this.commentText}
    this.confirm.emit(body);
  }
}
