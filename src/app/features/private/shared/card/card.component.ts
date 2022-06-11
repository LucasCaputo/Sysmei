import { Component, Input, OnInit } from '@angular/core';
import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';
import { CardInfo } from './interfaces/card-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() customerList!: Array<EmployeeResponse>;

  @Input() search: string = '';

  letters: Array<string> = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  getList: Array<CardInfo> = [];

  ngOnInit(): void {
    this.formatContacts(this.customerList);
  }

  private formatContacts(list: Array<EmployeeResponse>) {

    for (let i = 0; i < this.letters.length; i++) {
      let letter = this.letters[i];

      list.forEach((element: EmployeeResponse, index: number) => {
        if (
          letter == element.nome[0] ||
          letter.toLowerCase() == element.nome[0]
        ) {
          if (index == 0) {
            this.getList.push({
              inicial: letter,
              isFirstLetter: true,
              ...element,
            });
          } else {
            this.getList.push({
              inicial: letter,
              isFirstLetter: false,
              ...element,
            });
          }
        }
      });
    }
  }

  checklistContent(list: any, letter: string) {
    const found = list.find((element: any) => element.inicial == letter);

    if (found) return true;

    return false;
  }
}
