import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  @Input({ required: true }) name!: FormControl<string | null>;
}
