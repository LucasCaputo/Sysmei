import { Component, Input } from '@angular/core';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-message-tip',
  templateUrl: './message-tip.component.html',
  styleUrls: ['./message-tip.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class MessageTipComponent {
  @Input() public title!: string;
  @Input() public linkText!: string;
  @Input() public linkUrl!: string;

}
