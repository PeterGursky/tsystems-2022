import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrls: ['./confim-dialog.component.css']
})
export class ConfimDialogComponent {
  title: string = '';
  question: string = '';

  constructor(public dialogRef: MatDialogRef<ConfimDialogComponent>,
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
