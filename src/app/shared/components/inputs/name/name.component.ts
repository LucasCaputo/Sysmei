import { Component, Input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IsNameCompleted } from 'src/app/shared/services/utils/check-name';
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

  public isNameCompleted = signal(false)

  validateName() {
    this.isNameCompleted.set(IsNameCompleted(this.name))
  }
}
