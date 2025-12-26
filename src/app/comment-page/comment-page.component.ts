import { Component } from '@angular/core';
import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';
@Component({
  selector: 'app-comment-page',
  imports: [ProductReviewComponent],
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.css'
})
export class CommentPageComponent {

}
