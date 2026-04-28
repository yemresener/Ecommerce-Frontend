import { inject } from '@angular/core';
import { CanActivateFn , Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import {  PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn   = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if(!isPlatformBrowser(platformId)) {
    return true;
  }

  if(authService.getUser()()) {
    return true;
  }

  return authService.me().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );




};
