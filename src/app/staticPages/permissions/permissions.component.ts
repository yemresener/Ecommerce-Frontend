import { Component } from '@angular/core';
import { Router, RouterOutlet,NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-permissions',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent {
  isMainDashboard = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // başlangıç kontrolü
    this.isMainDashboard = this.router.url === '/izinler';

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

    this.isMainDashboard = url === '/izinler' || url === '/izinler/';

    if (this.isMainDashboard) {

      if (window.innerWidth > 780) {
        this.router.navigate(['/izinler/kvkk'], { replaceUrl: true }); 
      }
    }
  }



}
