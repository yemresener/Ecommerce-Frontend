import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink,RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-help-center',
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.css'
})
export class HelpCenterComponent {
  isMainDashboard = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // başlangıç kontrolü
    this.isMainDashboard = this.router.url === '/yardim';

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

    this.isMainDashboard = url === '/yardim' || url === '/yardim/';

    if (this.isMainDashboard) {

      if (window.innerWidth > 780) {
        this.router.navigate(['/yardim/teslimat-kosullari'], { replaceUrl: true }); 
      }
    }
  }

}
