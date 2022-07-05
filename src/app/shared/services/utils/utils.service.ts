import { Injectable } from '@angular/core';
import { DialogCloseOptions } from "../../../features/private/schedule/components/scheduling-form/interfaces/dialog-close-options";

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

  formatDateRequestPayload(result:DialogCloseOptions) {

    let month = (`0${1+result.allDay.getMonth()}`).slice(-2)
    let day = (`0${result.allDay.getDate()}`).slice(-2)

    const date = `${result.allDay.getFullYear()}-${month}-${day}`
      
    let dateRequestPayload = {
      allDay: `${date}`,
      start: `${date} ${result.start}`,
      end: `${date} ${result.end}`
    }
    
    return dateRequestPayload
    
  }
}
