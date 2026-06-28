import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from './api';
import { IProgram } from '../models/program.model';

@Service()
export class Program extends Api {

    getAll(): Observable<IProgram[]> {
        return this.http.get<IProgram[]>(
            `${this.apiUrl}/programs`
        );
    }

}