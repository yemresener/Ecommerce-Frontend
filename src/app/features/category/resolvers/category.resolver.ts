import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { RESPONSE_TOKEN } from '../../../core/tokens/response.token';
import { ListService } from '../../list-item/list.service';

export const CategoryResolver: ResolveFn<any> = (route) => {
  const service = inject(ListService);
  const router = inject(Router);
  const response = inject(RESPONSE_TOKEN, { optional: true }); 

  // 1. Sadece slug'ı değil, filtreleri de yakalıyoruz
  const slug = route.paramMap.get('slug');
  const queryParams = route.queryParams;

  // 2. Component'in içindeki gibi filtreleri API'nin beklediği objeye çeviriyoruz
  const filters: any = {
    slug: slug,
    page: Number(queryParams['page'] ?? 1)
  };

  if (queryParams['sort_by'])   filters.sort_by   = queryParams['sort_by'];
  if (queryParams['order'])     filters.order     = queryParams['order'];
  if (queryParams['min_price']) filters.min_price = Number(queryParams['min_price']);
  if (queryParams['max_price']) filters.max_price = Number(queryParams['max_price']);
  if (queryParams['q'])         filters.q         = queryParams['q'];

  // 3. API'ye sadece slug ile değil, FİLTRELERLE BİRLİKTE istek atıyoruz!
  // Not: Senin projende listeyi getiren servis "adverts" olduğu için onu kullanıyoruz.
  return service.adverts(filters).pipe(
    catchError((error) => {
      if (error.status === 404) {
         if (response) {
             response.status(404);
         }
         router.navigate(['/404'], { skipLocationChange: true });
      }
      return EMPTY; 
    })
  );
};