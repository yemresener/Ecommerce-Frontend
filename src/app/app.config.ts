import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- bunu ekle
import {  withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',  
        headerName: 'X-XSRF-TOKEN'
      })
    ),
   ]
};
