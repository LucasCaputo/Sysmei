import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {
  @Input({ required: true }) phone!: FormControl<string | null>;
  @Input({ required: true }) label!: string;
}
