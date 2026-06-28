import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StudentStore } from './stores/student-store';

@Component({
    selector: 'app-root',
    imports: [
		RouterOutlet
	],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})

export class App {
    protected readonly title = signal('frontend');
    private readonly store = inject(StudentStore);

    constructor() {
        this.store.load();
    }
}
