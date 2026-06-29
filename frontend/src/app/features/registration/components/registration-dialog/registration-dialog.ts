import { Component, inject, ViewChild } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { RegistrationForm } from '../registration-form/registration-form';
import { ICreateStudentRequest } from '../../../../models/student.model';
  

@Component({
  selector: 'app-registration-dialog',
  standalone: true,
  templateUrl: './registration-dialog.html',
  styleUrl: './registration-dialog.scss',
  imports: [MatDialogModule, MatButtonModule, RegistrationForm],
})
export class RegistrationDialog {
  private readonly dialogRef = inject(MatDialogRef<RegistrationDialog>);
  @ViewChild(RegistrationForm) form!: RegistrationForm;

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const value = this.form.value;
    const student: ICreateStudentRequest = {
      id: value.id,
      firstName: value.firstName,
      lastName: value.lastName,
      programId: value.programId,
      companyId: value.companyId,
    };

    this.dialogRef.close({
      student
    });
  }
}
