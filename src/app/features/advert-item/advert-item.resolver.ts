import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { RESPONSE_TOKEN } from '../../core/tokens/response.token';
import { AdvertItemService } from './advert-item.service';


export const AdvertItemResolver:ResolveFn<any>=(route)=>{
    const service = inject(AdvertItemService);
    const router = inject(Router);
    const response = inject(RESPONSE_TOKEN, { optional: true }); 
    
    const slug = route.paramMap.get('slug');
    
    if (!slug) {
        if(response){
            response.status(404);
        }
        router.navigate(['/404'], { skipLocationChange: true });
        return EMPTY; 
    }

    return service.getAdvert(slug).pipe(
        catchError((error)=>{
            if(error.status === 404){
                if(response){
                    response.status(404);
                }
                router.navigate(['/404'],{skipLocationChange:true});
            }
            return EMPTY;
        })
    )
}