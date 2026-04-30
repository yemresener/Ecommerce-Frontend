import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(!value) return '';
    if(value === undefined) return '';
    return value.charAt(0);
  }

}
