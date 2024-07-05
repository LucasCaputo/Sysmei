import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {

  @Output() closeButton = new EventEmitter();

  @Output() confirmButton = new EventEmitter();

  @Input({ required: true }) disableConfirmButton!: boolean;

  constructor(public viewportService: ViewportService) {}
}
