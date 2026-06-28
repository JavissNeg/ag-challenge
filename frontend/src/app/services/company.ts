import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from './api';
import { ICompany } from '../models/company.model';

@Service()
export class Company extends Api {

    getAll(): Observable<ICompany[]> {
        return this.http.get<ICompany[]>(
            `${this.apiUrl}/companies`
        );
    }

}