import { Component,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
AuthService
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService =inject(AuthService);

  isMainDashboard = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // başlangıç kontrolü
    this.isMainDashboard = this.router.url === '/hesabim';

    // route değişince güncelle


    this.handleRoutingLogic(this.router.url);

    // Route her değiştiğinde kontrol et
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.handleRoutingLogic(e.urlAfterRedirects || e.url);
    });
  }


  private handleRoutingLogic(url: string) {

    this.isMainDashboard = url === '/hesabim' || url === '/hesabim/';

    if (this.isMainDashboard) {

      if (window.innerWidth > 780) {
        this.router.navigate(['/hesabim/siparislerim'], { replaceUrl: true }); 
      }
    }
  }

  logout(){
    this.authService.logout().subscribe();
  }

}
