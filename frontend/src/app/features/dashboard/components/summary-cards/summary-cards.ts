import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


import { StudentStore } from '../../../../stores/student-store';


@Component({
  selector: 'app-summary-cards',
  imports: [
	AsyncPipe,
	MatCardModule,
	MatIconModule
  ],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.scss',
})
export class SummaryCards {

  	private readonly store = inject(StudentStore);
    readonly summary$ = this.store.summary$;

}
