import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from './api';
import { IStatus } from '../models/status.model';

@Service()
export class Status extends Api {

    getAll(): Observable<IStatus[]> {
        return this.http.get<IStatus[]>(
            `${this.apiUrl}/statuses`
        );
    }

}