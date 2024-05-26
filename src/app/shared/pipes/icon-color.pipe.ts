import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconColor',
})
export class IconColorPipe implements PipeTransform {
  transform(value: string): any {
    switch (value?.length) {
      case 0:
        return `background-color: #FF8000`;
      case 1:
        return `background-color: #01DF3A`;
      case 2:
        return `background-color: #0000FF`;
      case 3:
        return `background-color: #01DFA5`;
      case 4:
        return `background-color: #A901DB`;
      case 5:
        return `background-color: #8A0829`;
      case 6:
        return `background-color: #0000FF`;
      case 7:
        return `background-color: #01DFA5`;
      case 8:
        return `background-color: #FF8000`;
      case 9:
        return `background-color: #01DF3A`;
      case 10:
        return `background-color: #0000FF`;
      case 11:
        return `background-color: #01DFA5`;
      case 12:
        return `background-color: #A901DB`;
      case 13:
        return `background-color: #8A0829`;
      case 14:
        return `background-color: #0000FF`;
      case 15:
        return `background-color: #01DFA5`;

      case 16:
        return `background-color: #FF8000`;
      case 17:
        return `background-color: #01DF3A`;
      case 18:
        return `background-color: #0000FF`;
      case 19:
        return `background-color: #01DFA5`;
      case 20:
        return `background-color: #A901DB`;
      case 21:
        return `background-color: #8A0829`;
      case 22:
        return `background-color: #0000FF`;
      case 23:
        return `background-color: #01DFA5`;
      case 24:
        return `background-color: #FF8000`;
      case 25:
        return `background-color: #01DF3A`;
      case 26:
        return `background-color: #0000FF`;
      case 27:
        return `background-color: #01DFA5`;
      case 28:
        return `background-color: #A901DB`;
      case 29:
        return `background-color: #8A0829`;
      case 30:
        return `background-color: #0000FF`;
      case 31:
        return `background-color: #01DFA5`;

      default:
        return `background-color: #000`;
    }
  }
}
