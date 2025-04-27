import { Injectable } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { ViewportService } from '../viewport.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private readonly viewportService: ViewportService) {}

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

    const dateObj = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput);

    const formattedDate = format(dateObj, 'yyyy-MM-dd');

    return {
      allDay: formattedDate,
      start: `${formattedDate} ${result?.start}`,
      end: `${formattedDate} ${result?.end}`,
    };
  }

  public dialogSize(): { width: string; maxWidth: string; height: string; maxHeight: string } {
    const mobileSize = this.viewportService.screenSize === 'mobile';

    return {
      width: mobileSize ? '100vw' : '60vw',
      maxWidth: mobileSize ? '100vw' : '800px',
      height: mobileSize ? '100vh' : '80vh',
      maxHeight: mobileSize ? '100vh' : '800px',
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
