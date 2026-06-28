import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from './api';
import { IStudent } from '../models/student.model';

@Service()
export class Student extends Api {

    getAll(): Observable<IStudent[]> {
        return this.http.get<IStudent[]>(
            `${this.apiUrl}/students`
        );
    }

    getById(id: number): Observable<IStudent> {
        return this.http.get<IStudent>(
            `${this.apiUrl}/students/${id}`
        );
    }

    create(student: IStudent): Observable<IStudent> {
        return this.http.post<IStudent>(
            `${this.apiUrl}/students`,
            student
        );
    }

    update(
        id: number,
        student: IStudent
    ): Observable<IStudent> {
        return this.http.put<IStudent>(
            `${this.apiUrl}/students/${id}`,
            student
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/students/${id}`
        );
    }

}