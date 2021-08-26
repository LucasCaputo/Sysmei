import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  customerList!: Array<EmployeeResponse>;


  @Input()
  search: string = '';

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

  getList: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    let list = this.customerList
    console.log(this.customerList, 'CARD');
    this.formatContacts(this.customerList);


   
  }

  formatContacts(list: Array<EmployeeResponse>) {
    this.getList = [];
    this.customerList = [];

    this.getList.push(list);
    this.getList[0].sort((a: any, b: any) => {
      if (a.nome < b.nome) {
        return -1;
      } else {
        return true;
      }
    });

    for (let i = 0; i < this.letters.length; i++) {
      let letter = this.letters[i];

      this.getList[0].forEach((element: any, index: number) => {
        if (
          letter == element.nome[0] ||
          letter.toLowerCase() == element.nome[0]
        ) {
          if (index == 0) {
            this.customerList.push({
              inicial: letter,
              isFirstLetter: true,
              ...element,
            });
          } else {
            this.customerList.push({
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

    if (found) {
      return true;
    }

    return false;
  }

  openDialog(customer: any) {
    console.log(customer);
  }
}
