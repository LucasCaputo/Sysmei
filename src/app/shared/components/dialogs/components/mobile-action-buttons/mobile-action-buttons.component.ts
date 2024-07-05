import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-mobile-action-buttons',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './mobile-action-buttons.component.html',
  styleUrls: ['./mobile-action-buttons.component.scss'],
})
export class MobileActionButtonsComponent {
  @Output() closeButton = new EventEmitter();

  @Output() confirmButton = new EventEmitter();

  @Input({ required: true }) title!: string;

  @Input({ required: true }) disableConfirmButton!: boolean;

  constructor(public viewportService: ViewportService) {}
}
