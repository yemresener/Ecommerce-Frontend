import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withInMemoryScrolling  } from '@angular/router';
import { provideHttpClient,withFetch  } from '@angular/common/http'; // <-- bunu ekle
import {  withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(withFetch()),
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