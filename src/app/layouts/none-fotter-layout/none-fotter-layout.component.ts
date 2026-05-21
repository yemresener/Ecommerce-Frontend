import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/layouts/navbar/navbar.component';
@Component({
  selector: 'app-none-fotter-layout',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './none-fotter-layout.component.html',
  styleUrl: './none-fotter-layout.component.css'
})
export class NoneFotterLayoutComponent {

}
