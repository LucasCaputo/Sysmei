import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  @Input({ required: true }) email!: FormControl<string | null>;
}
