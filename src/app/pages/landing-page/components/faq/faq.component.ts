import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  isQuestion1Open = false;
  isQuestion2Open = false;
  isQuestion3Open = false;
  isQuestion4Open = false;

  toggleQuestion1() {
    this.isQuestion1Open = !this.isQuestion1Open;
  }

  toggleQuestion2() {
    this.isQuestion2Open = !this.isQuestion2Open;
  }

  toggleQuestion3() {
    this.isQuestion3Open = !this.isQuestion3Open;
  }

  toggleQuestion4() {
    this.isQuestion4Open = !this.isQuestion4Open;
  }
}
