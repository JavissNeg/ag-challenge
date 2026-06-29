import { Component, inject, ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { IStudentView } from '../../../../models/student-view.model';

import { ChangeStatusForm } from '../change-status-form/change-status-form';


@Component({
  selector: 'app-change-status-dialog',
  standalone: true,
  templateUrl: './change-status-dialog.html',
  styleUrl: './change-status-dialog.scss',
  imports: [MatDialogModule, MatButtonModule, ChangeStatusForm],
})
export class ChangeStatusDialog {
  readonly student = inject<IStudentView>(MAT_DIALOG_DATA);
  @ViewChild(ChangeStatusForm) form!: ChangeStatusForm;

  private readonly dialogRef = inject(MatDialogRef<ChangeStatusDialog>);

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }
    
    this.dialogRef.close(
      this.form.value
    );
  }
}
