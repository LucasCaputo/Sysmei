import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogActionButtonsComponent } from '../components/dialog-action-buttons/dialog-action-buttons.component';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [SharedModule, DialogActionButtonsComponent],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  private user = this.authService.getUser()

  public userForm = this.formBuilder.group({
    name: this.user?.nome || '',
    phone: this.user?.telefone || '',
    login: this.user?.login || ''
  })

  public passwordForm = this.formBuilder.group({
    oldPassword: '',
    password: '',
    repetPassword: ''
  })

  public removeAccountForm = this.formBuilder.group({
    enabled: true,
    status: true,
  })

  public constructor(private authService: AuthService, private formBuilder: FormBuilder){
    
  }

}
