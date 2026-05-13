import { Component,inject,Input,HostListener,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCategoryService } from '../Services/navbar-category.service';
import { Navbar } from '../interfaces/navbar';
import { AuthService } from '../core/services/auth.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { FirstLetterPipe } from '../Pipes/first-letter.pipe';
import { CartService } from '../Services/cart.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap,tap } from 'rxjs/operators';
import { MiniAdvert } from '../interfaces/mini-advert';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule,FirstLetterPipe,RouterLink,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent extends BrowserAware{

  @Input() categoryActive:boolean =false;

  authService = inject(AuthService);
  cartService = inject(CartService);

  constructor(private navbarService:NavbarCategoryService, private eRef: ElementRef){super()
    
  }

  activeMenu=false;
  activeCategory: Navbar | null = null;
  user = this.authService.getUser();
  cartCount = this.cartService.getCartCount();

  isLoading = true;

  ngOnInit(): void {
    this.loadCategories();
    this.onSearchChange();
    if(this.isBrowser()){
    
      if (!document.cookie.includes('is_logged=')) {
        this.isLoading = false;
        return;
      }
      
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


  searchControl = new FormControl('');
  searchResults: MiniAdvert[] = [];
  isSearching = false;
  isSearchFocused = false;

  onSearchChange() {
    this.searchControl.valueChanges.pipe(
      tap(q => {
        if ((q?.length ?? 0) < 2) {
          this.searchResults = [];
          this.isSearching = false;
        } else {
          this.isSearching = true;
        }
      })
    ).subscribe();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(q => (q?.length ?? 0) >=2),
      tap(() => this.isSearching=true),
      switchMap(q => this.navbarService.search(q!))
    ).subscribe({
      next: results=>{
        this.searchResults = results.data;
        this.isSearching=false;

      },
      error: () => 
        {
          this.isSearching = false
        }

    })

  }


  goToSearch() {
    const q = this.searchControl.value;
    if (!q?.trim()) return;
    this.isSearchFocused = false;
    window.location.href = `/ara?q=${q}`
  }
  
  goToAdvert(item:MiniAdvert){
     this.isSearchFocused = false;
      window.location.href = `/urun/${item.slug}`
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isSearchFocused = false;
      this.isSearchOpen=false;
    }
  }

  isSearchOpen = false;
  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    this.searchResults=[];
    this.isSearching=false;
      this.searchControl.reset();
  }

  closeSearch(): void {
    this.isSearchOpen = false;
    this.searchResults=[];
    this.isSearching=false;
  }





}
