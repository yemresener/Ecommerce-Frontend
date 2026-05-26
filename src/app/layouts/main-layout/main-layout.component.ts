import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/layouts/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/layouts/navbar/navbar.component';
import { LayoutService } from '../../Services/layout.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent,FooterComponent,RouterOutlet,CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(public layoutService:LayoutService){};
}
