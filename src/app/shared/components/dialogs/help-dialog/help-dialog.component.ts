import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedInputModule } from '../../inputs/shared-input.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-help-dialog',
  standalone: true,
  imports: [SharedModule, MatCheckboxModule, SharedInputModule],
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent {
  public userForm = this.formBuilder.group({
    name: '',
    phone: '',
    login: '',
    allowWhatsApp: '',
    feedback: '',
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {}

  public saveFeedback(): void {
    console.warn(this.userForm.value);
  }
}
