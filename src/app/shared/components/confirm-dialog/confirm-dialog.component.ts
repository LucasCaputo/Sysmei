import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  FormConfirm = this.fb.group({
    confirmed: [this.data.confirmed || false],
  });

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { confirmed: boolean },
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {}
}
