import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { StudentStore } from '../../../../stores/student-store';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class RegistrationForm implements OnInit {
  readonly store = inject(StudentStore);

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyId: [0, Validators.min(1)],
    programId: [0, Validators.min(1)],
    enrollmentDate: [new Date(), Validators.required],
  });

  ngOnInit(): void {
    this.store.load();
  }
}
