import { Component, input } from '@angular/core';

import { NgClass } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-status-chip',
    standalone: true,
    templateUrl: './status-chip.html',
    styleUrl: './status-chip.scss',
    imports: [
        MatChipsModule,
        NgClass
    ]
})
export class StatusChip {

    readonly code = input.required<string>();
    readonly name = input.required<string>();
}