import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFiltro',
})
export class ArrayFiltroPipe implements PipeTransform {
  transform(value: Array<any>, filtro: string): any {
    if (filtro) {
      filtro = filtro
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return value.filter(
        (a) =>
          a.nome
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .indexOf(filtro.normalize('NFD')) >= 0
      );
    } else {
      return value;
    }
  }
}
