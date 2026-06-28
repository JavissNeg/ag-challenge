import { Component, inject } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { RegistrationForm } from '../registration-form/registration-form';
  

@Component({
  selector: 'app-registration-dialog',
  standalone: true,
  templateUrl: './registration-dialog.html',
  styleUrl: './registration-dialog.scss',
  imports: [MatDialogModule, MatButtonModule, RegistrationForm],
})
export class RegistrationDialog {
  private readonly dialogRef = inject(MatDialogRef<RegistrationDialog>);

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    // TODO: Guardar alumno
  }
}
