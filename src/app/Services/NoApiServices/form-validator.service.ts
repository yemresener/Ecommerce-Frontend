import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  luhnValidator(control: any) {
    const value = (control.value || '').replace(/\s+/g, '');
  
    if (!value) return null;
  
    let sum = 0;
    let shouldDouble = false;
  
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value[i], 10);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    return sum % 10 === 0 ? null : { invalidCardNumber: true };
  }


  dateValidator(control:any){
    const value = (control.value || '').replace(/\D/g, '');
    if (!value) return null;
    if (value.length !== 4) {
      return { invalidFormat: true };
    }

    const month = Number(value.slice(0, 2));
    const year = Number(value.slice(2, 4));

    
    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }

    const now = new Date();

    const currentYear = Number(String(now.getFullYear()).slice(2, 4));
    const currentMonth = now.getMonth() + 1;
  
    // expiry year karşılaştır
    if (year < currentYear) {
      return { expired: true };
    }
  
    // aynı yıl ise ay kontrolü
    if (year === currentYear && month < currentMonth) {
      return { expired: true };
    }
  
    return null;

  }
}
