import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title: string = '';
  question: string = '';

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: ConfirmDialogData) {
      this.title = data.title;
      this.question = data.question;
    }

  onNoClick() {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogData {
  title: string,
  question: string
}
