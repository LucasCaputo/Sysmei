import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-dialog-action-buttons',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dialog-action-buttons.component.html',
  styleUrls: ['./dialog-action-buttons.component.scss']
})
export class DialogActionButtonsComponent {

  @Output() closeButton = new EventEmitter();

  @Output() confirmButton = new EventEmitter();

  @Input({required: true}) title!: string;

  @Input({required: true}) disableConfirmButton!: boolean;

  constructor(public viewportService: ViewportService) {}
 
}
