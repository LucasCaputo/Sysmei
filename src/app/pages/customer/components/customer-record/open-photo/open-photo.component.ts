import { Component, Inject, OnInit } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-open-photo',
  templateUrl: './open-photo.component.html',
  styleUrls: ['./open-photo.component.scss'],
})
export class OpenPhotoComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { data: string },
  ) {}

  ngOnInit(): void {}
}
