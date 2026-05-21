import { Component,Input } from '@angular/core';
import { ReviewStats } from '../interfaces/review-stats';
import { MiniAdvert } from '../../advert/interfaces/mini-advert';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-rating-stars',
  imports: [CommonModule],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.css'
})
export class RatingStarsComponent {

  @Input() rating!:number;

}
