import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { StudentStore } from '../../../../stores/student-store';

@Component({
  selector: 'app-change-status-form',
  standalone: true,
  templateUrl: './change-status-form.html',
  styleUrl: './change-status-form.scss',
  imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class ChangeStatusForm implements OnInit {
  readonly store = inject(StudentStore);

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    statusId: [0, Validators.min(1)],

    reason: ['', Validators.required],
  });

  ngOnInit(): void {
    this.store.load();
  }

  get value() {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
