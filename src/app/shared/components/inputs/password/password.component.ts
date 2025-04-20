import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Input({ required: true }) password!: FormControl<string | null>;
  @Input({ required: true }) label!: string;
  @Input() required = true;

  type = 'password';
}
