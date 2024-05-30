import { Injectable } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, confirmation: string, isError: boolean) {
    this._snackBar.open(message, confirmation, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`${isError ? 'bg-error' : 'bg-success'}`],
    });
  }
}
