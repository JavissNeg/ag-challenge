import { Component, computed, input } from '@angular/core';

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

    readonly label = computed(() => {

        switch (this.code()) {

            case 'ACTIVE':
                return 'Active';

            case 'SUSPENDED':
                return 'Suspended';

            case 'COMPANY_LEAVE':
                return 'Company Leave';

            case 'PROGRAM_LEAVE':
                return 'Program Leave';

            case 'GRADUATED':
                return 'Graduated';

            case 'ENROLLED':
                return 'Enrolled';

            case 'REENROLLED':
                return 'Reenrolled';

            default:
                return this.code();

        }

    });

}