import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MenuComponent],
  imports: [MatListModule, MatIconModule, MatButtonModule],
  exports: [MenuComponent],
})
export class MenuModule {}
