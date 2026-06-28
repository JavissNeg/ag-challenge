import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from './api';

import { IEnrollment } from '../models/enrollment.model';
import { IStatusHistory } from '../models/status-history.model';

@Service()
export class Enrollment extends Api {

    getAll(): Observable<IEnrollment[]> {
        return this.http.get<IEnrollment[]>(
            `${this.apiUrl}/enrollments`
        );
    }

    getById(id: number): Observable<IEnrollment> {
        return this.http.get<IEnrollment>(
            `${this.apiUrl}/enrollments/${id}`
        );
    }

    create(enrollment: IEnrollment): Observable<IEnrollment> {
        return this.http.post<IEnrollment>(
            `${this.apiUrl}/enrollments`,
            enrollment
        );
    }

    update(
        id: number,
        enrollment: IEnrollment
    ): Observable<IEnrollment> {

        return this.http.put<IEnrollment>(
            `${this.apiUrl}/enrollments/${id}`,
            enrollment
        );
    }

    changeStatus(
        enrollmentId: number,
        statusCode: string,
        reason: string
    ): Observable<IStatusHistory> {

        return this.http.post<IStatusHistory>(
            `${this.apiUrl}/enrollments/${enrollmentId}/status`,
            {
                status_code: statusCode,
                reason
            }
        );
    }

}