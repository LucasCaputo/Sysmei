import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleDialogComponent } from './schedule-dialog.component';

const routes: Routes = [{ path: '', component: ScheduleDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleDialogRoutingModule {}
