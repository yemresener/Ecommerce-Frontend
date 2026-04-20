import { ApplicationConfig, provideZoneChangeDetection,APP_INITIALIZER } from '@angular/core';
import { provideRouter,withInMemoryScrolling  } from '@angular/router';
import { provideHttpClient,withFetch  } from '@angular/common/http'; // <-- bunu ekle
import {  withXsrfConfiguration } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [provideNgxMask(),
    provideAnimations(),provideToastr({
    positionClass: 'toast-top-right',
    timeOut: 3000,
    closeButton: true
  })
  ,provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'disabled', 
        anchorScrolling: 'enabled',
      })
    ), provideClientHydration(withEventReplay()),
 
   ]
};




/*
provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',  
        headerName: 'X-XSRF-TOKEN'
      })
    ),

    */