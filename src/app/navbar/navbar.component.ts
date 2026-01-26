import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCategoryService } from '../Services/navbar-category.service';
import { Navbar } from '../interfaces/navbar';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private navbarService:NavbarCategoryService){}
  activeMenu=false;
  activeCategory: Navbar | null = null;

  ngOnInit(): void {
    this.loadCategories();
    
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
}
