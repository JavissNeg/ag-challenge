import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from './api';
import { ICreateStudentRequest, IStudent, IUpdateStudentRequest } from '../models/student.model';

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

    create(student: ICreateStudentRequest): Observable<IStudent> {
        return this.http.post<IStudent>(
            `${this.apiUrl}/students`,
            student
        );
    }

    update(
        id: number,
        student: IUpdateStudentRequest
    ): Observable<IStudent> {
        return this.http.put<IStudent>(
            `${this.apiUrl}/students/${id}`,
            student
        );
    }

    delete(id: number): Observable<number> {
        return this.http.delete<number>(
            `${this.apiUrl}/students/${id}`
        );
    }

}