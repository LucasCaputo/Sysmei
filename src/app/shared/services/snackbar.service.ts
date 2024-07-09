import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, confirmation: string, isError: boolean) {
    this._snackBar.open(message, confirmation, {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`${isError ? 'bg-error' : 'bg-success'}`],
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['bg-success'],
    });
  }

  openErrorSnackBar(message?: string) {
    this._snackBar.open(
      `Tivemos um erro ${'para ' + message}, tente novamente`,
      'X',
      {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['bg-error'],
      },
    );
  }
}
