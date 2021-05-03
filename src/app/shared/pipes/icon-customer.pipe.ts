import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconCustomer',
})
export class IconCustomerPipe implements PipeTransform {
  transform(value: string): any {
    const name = value.split(' ');

    if (name[0] && name[1]) {
      let firstname = name[0];

      let lastName = name[1];

      return firstname[0].toUpperCase() + lastName[0].toUpperCase();
    } else {
      return '';
    }
  }
}
