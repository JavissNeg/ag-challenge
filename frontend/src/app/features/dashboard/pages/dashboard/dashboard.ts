import { Component } from '@angular/core';
import { SummaryCards } from '../../components/summary-cards/summary-cards';
import { StudentsTable } from '../../../students/components/students-table/students-table';


@Component({
    selector: 'app-dashboard',
    imports: [
      SummaryCards, 
      StudentsTable
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {}
