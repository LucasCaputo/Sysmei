import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  formatPhone(phone: string) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
  }

  clearStringData(text: string) {
    return text.replace(/.{9}$/gm, '').replace(/T/gm, ' ');
  }

  formatStringData(text: string) {
    let split = text.split(' ');

    return `${split[0]}T${split[1]}:00-03:00`;
  }

  formatDateRequestPayload(result: any) {
    const dateInput = result?.allDay;
    const dateMoment: Moment = moment(dateInput);

    const year = dateMoment.year();
    const month = String(dateMoment.month() + 1).padStart(2, '0');
    const day = String(dateMoment.date()).padStart(2, '0');

    const date = `${year}-${month}-${day}`;

    return {
      allDay: date,
      start: `${date} ${result?.start}`,
      end: `${date} ${result?.end}`,
    };
  }
}

export function getDate30DaysAgo(): string {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 90));

  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, '0');
  const day = String(pastDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getCurrentDate(): string {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.setDate(currentDate.getDate() + 90));

  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, '0');
  const day = String(pastDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
