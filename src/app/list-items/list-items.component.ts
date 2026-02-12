import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSliderComponent } from '../components/sections/product-slider/product-slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../Services/list.service';
import { CategoryFilters } from '../interfaces/category-filters';
import { MiniAdvert } from '../interfaces/mini-advert';
import { Category } from '../interfaces/category';
import { BreadCrumb } from '../interfaces/bread-crumb';
@Component({
  selector: 'app-list-items',
  imports: [CommonModule,CardComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {

  constructor(private route:ActivatedRoute,private service:ListService){}

  categoryOpen = true;
  priceOpen=true;
  brandOpen= true;
  sortOption=false;

  slug!:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.slug=params.get('slug')??'';
    })
    console.log(this.slug);
    this.getPage();
  }

  category_tree!:Category;
  breadcrumb!:BreadCrumb[];
  adverts!: MiniAdvert[];
  getPage(){
    this.service.adverts(this.slug).subscribe({
      next:(res)=>{
        console.log(res)
        this.adverts=res.data;
        this.category_tree=res.filters.category_tree;
        this.breadcrumb=res.filters.breadcrumb;
        console.log(this.category_tree,'tree')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


    
  categoryBests =[
    {
      id: 1,
      category_id: 101,
      title: 'Oyuncak',
      slug: 'oyuncak-1',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 1,
        price: 200,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category6.jpg'
      }
    },
    {
      id: 2,
      category_id: 101,
      title: 'Oyuncak',
      slug: 'oyuncak-2',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 2,
        price: 2300,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category3.jpg'
      }
    },
    {
      id: 3,
      category_id: 101,
      title: 'Oyuncak',
      slug: 'oyuncak-3',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 3,
        price: 200,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category3.jpg'
      }
    },
    {
      id: 4,
      category_id: 101,
      title: 'Oyuncak',
      slug: 'oyuncak-4',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 4,
        price: 200,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category3.jpg'
      }
    },
    {
      id: 5,
      category_id: 102,
      title: 'Köpek Konserve',
      slug: 'kopek-konserve-1',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 5,
        price: 2100,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category5.jpg'
      }
    },
    {
      id: 6,
      category_id: 101,
      title: 'Oyuncak',
      slug: 'oyuncak-5',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 6,
        price: 200,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category3.jpg'
      }
    },
    {
      id: 7,
      category_id: 103,
      title: 'Kedi Kumu',
      slug: 'kedi-kumu-1',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 7,
        price: 200,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category11.jpg'
      }
    },
    {
      id: 8,
      category_id: 104,
      title: 'Kedi Konserve',
      slug: 'kedi-konserve-1',
      avg_rating: 4.2,
      total_comments: 20,
      item_ref: {
        id: 8,
        price: 25,
        discount_price: null,
        is_discount_active: false,
        image: 'assets/images/category2.jpg'
      }
    },

  ];
  
  
  
}
