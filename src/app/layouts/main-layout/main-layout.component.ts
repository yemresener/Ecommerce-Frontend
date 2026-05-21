import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/layouts/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/layouts/navbar/navbar.component';
@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent,FooterComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
