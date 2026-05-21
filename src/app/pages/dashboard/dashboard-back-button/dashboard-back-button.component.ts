import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-back-button',
  imports: [],
  templateUrl: './dashboard-back-button.component.html',
  styleUrl: './dashboard-back-button.component.css'
})
export class DashboardBackButtonComponent {
  constructor(private router:Router){}

  backBtn(){
    this.router.navigate(['/hesabim']);
  }
}
