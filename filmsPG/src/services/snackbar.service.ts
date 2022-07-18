import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  errorMessage(message: string) {
    this.snackBar.open(message, "ERROR", {panelClass: 'redSnackBar', duration: 4000});
  }

  successMessage(message: string) {
    this.snackBar.open(message, "SUCCESS", {panelClass: 'greenSnackBar', duration: 4000});
  }
}
