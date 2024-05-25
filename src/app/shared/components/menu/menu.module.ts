import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [MenuComponent],
  imports: [MatListModule, MatIconModule, MatExpansionModule],
  exports: [MenuComponent],
})
export class MenuModule {}
