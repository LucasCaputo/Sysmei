import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss']
})
export class SchedulingFormComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<SchedulingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    public schedulingForm: FormGroup,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.schedulingForm = this.fb.group({
      data: this.data
    })
  }

  
  onCancel(): void {
    this.dialogRef.close();
  }

}
