import { Injectable,signal } from '@angular/core';
export interface Notification{
    errors: string[];
    type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
    private notification = signal<Notification | null>(null);


    set(errors: string[], type: Notification['type'] = 'warning'){
        this.notification.set({ errors, type });
    }

    get(){ return this.notification(); }
    clear(){ this.notification.set(null); }

}
