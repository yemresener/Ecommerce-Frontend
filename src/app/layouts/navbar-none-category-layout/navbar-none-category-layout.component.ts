import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-none-category-layout',
imports: [CommonModule,FooterComponent,NavbarComponent,RouterOutlet],
  templateUrl: './navbar-none-category-layout.component.html',
  styleUrl: './navbar-none-category-layout.component.css'
})
export class NavbarNoneCategoryLayoutComponent {

}
