import { Component,inject,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCategoryService } from '../Services/navbar-category.service';
import { Navbar } from '../interfaces/navbar';
import { AuthService } from '../core/services/auth.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { FirstLetterPipe } from '../Pipes/first-letter.pipe';
import { CartService } from '../Services/cart.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FirstLetterPipe,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent extends BrowserAware{

  @Input() categoryActive:boolean =false;

  authService = inject(AuthService);
  cartService = inject(CartService);

  constructor(private navbarService:NavbarCategoryService, ){super()
    
  }

  activeMenu=false;
  activeCategory: Navbar | null = null;
  user = this.authService.getUser();
  cartCount = this.cartService.getCartCount();

  isLoading = true;
  ngOnInit(): void {
    this.loadCategories();

    if(this.isBrowser()){
    
      if(!this.user()){
        this.authService.me().subscribe({
          next:(res)=>{
            this.isLoading=false;

          },
          error:(err)=>{
            this.isLoading=false;

          }
        });
        
      }
      if(this.cartCount() === null){
        this.isLoading=true;
        this.cartService.callCartCount().subscribe({
          next:(res)=>{
            this.isLoading=false;


          },
          error:(err)=>{
            this.isLoading=false;


          }
        });

      }else{
        this.isLoading=false;
      }
    }
  }
  categories:Navbar[]=[];
  loadCategories(){
    this.navbarService.getCategories().subscribe({
      next:(res)=>{
        this.categories=res.data;
        console.log('kategori',this.categories);
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  isSearchOpen = false;
  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  closeSearch(): void {
    this.isSearchOpen = false;
  }

}
