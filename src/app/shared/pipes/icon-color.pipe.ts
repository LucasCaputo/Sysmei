import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconColor',
})
export class IconColorPipe implements PipeTransform {
  transform(value: string): any {
    const name = value.split(' ');

    if (value.length < 9 && name.length <= 2) {
      return `background-color: #FF8000`;
    } else if (value.length >= 9 && value.length <= 15 && name.length <= 2) {
      return `background-color: #01DF3A`;
    } else if (value.length > 15 && name.length <= 2) {
      return `background-color: #0000FF`;
    } else if (value.length < 11 && name.length > 2) {
      return `background-color: #01DFA5`;
    } else if (value.length >= 11 && value.length <= 17 && name.length > 2) {
      return `background-color: #A901DB`;
    } else if (value.length > 17 && name.length > 2) {
      return `background-color: #8A0829`;
    }

    return `background-color: #000`;
  }
}
