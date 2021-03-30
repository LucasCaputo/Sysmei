import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SchedulingService } from 'src/app/shared/services/scheduling.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  @ViewChild('titleInput') titleInput: ElementRef | undefined;
  @ViewChild('descriptionInput') descriptionInput: ElementRef | undefined;

  title = '';
  description = '';

  constructor(
    private schedulingService: SchedulingService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.data);
  }

  // createScheduling(){
  //   console.log(this.data);

  //   this.schedulingService.postScheduling(this.schedulingForm.value).subscribe(result => {});
  //   this.dialogRef.close();
  //   this.schedulingForm.reset();
  //   window.location.reload();
  // }

  // onCancel(): void {
  //   this.dialogRef.close();
  // }
}
