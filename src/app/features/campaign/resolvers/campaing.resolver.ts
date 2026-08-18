import { inject } from '@angular/core';
import { Resolve, ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { RESPONSE_TOKEN } from '../../../core/tokens/response.token';
import { CampaignServiceService } from '../campaign-service.service';

export const CampaignResolver: ResolveFn<any> = (route) =>{
    const service = inject(CampaignServiceService);
    const router = inject(Router);
    const response = inject(RESPONSE_TOKEN, { optional: true }); 

    const slug = route.paramMap.get('slug') ?? '';
    const queryParams = route.queryParams;

    const filters:any = {
        slug:slug,
        page:Number(queryParams['page'] ?? 1)
    };

    if (queryParams['sort_by'])   filters.sort_by   = queryParams['sort_by'];
    if (queryParams['order'])     filters.order     = queryParams['order'];

    return service.getAdverts(filters,slug).pipe(
        catchError((error)=>{
            if(error.status === 404){
                if(response){
                    response.status(404);
                }
                router.navigate(['/404'], { skipLocationChange: true });
            }
            return EMPTY;
        })
    )

}