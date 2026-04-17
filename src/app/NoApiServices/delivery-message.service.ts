import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMessageService {

  get deliveryMessage(): string {
    const now = new Date();
    const targetDate = new Date(now);
    const day = now.getDay(); 
    const hour = now.getHours();
  
    let addDays = 0;
    
    if(day === 6){
      addDays=2;
    }else if ( day === 0){
      addDays=1;
    }else if (day === 5 && (hour>=17 || hour>=16)){
      addDays=3;
    }else if (hour>=17 || hour>=16){
      addDays=1;
    }

    if(addDays === 0) return 'Bugün Kargoda!';
    if(addDays === 1) return 'Yarın Kargoda!';

    targetDate.setDate(now.getDate() + addDays);

    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    const days = [
      'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
    ];

    const d = targetDate.getDate();
    const m = months[targetDate.getMonth()];
    const dayName = days[targetDate.getDay()];

    return `${d} ${m} ${dayName}`;

    
  }

}
