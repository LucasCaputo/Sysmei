import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  formatPhone(phone: string) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(
      3,
      7
    )}-${phone.slice(7, 11)}`;
  }

  clearStringData(text: string) {
    return text.replace(/.{9}$/gm, '').replace(/T/gm, ' ');
  }

  formatStringData(text: string) {
    let split = text.split(' ');

    return `${split[0]}T${split[1]}:00-03:00`;
  }

  formatDateRequestPayload(result:any) {
    const date = new Date(result.date).toISOString() + '0';

    const clearDate = this.clearStringData(date);

    const split = clearDate?.split(' ');

    let dateRequestPayload = {
      allDay: '',
      start: '',
      end: ''
    }

    if(split[0]) {
      return dateRequestPayload = {
        allDay: `${split[0]}`,
        start: `${split[0]} ${result.timeStart}`,
        end: `${split[0]} ${result.timeEnd}`,
      }
    }

    return dateRequestPayload
    
  }
}
