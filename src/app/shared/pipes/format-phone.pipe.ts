import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {
  transform(phone: string): any {
    if (!phone.length) {
      return '';
    }

    if(phone.length === 11) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(
        3,
        7
      )}-${phone.slice(7, 11)}`;
    }

    return `${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 5)} ${phone.slice(
      5,
      9
    )}-${phone.slice(9, 13)}`;
  }
}
