import { Component } from '@angular/core';
import { SummaryCards } from '../../components/summary-cards/summary-cards';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCards
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
