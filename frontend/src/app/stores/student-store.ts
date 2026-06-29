import { inject, Service } from '@angular/core';
import { BehaviorSubject, forkJoin, map } from 'rxjs';

import { AppState } from '../models/app-state.model';

import { IStudentView } from '../models/student-view.model';
import { ISummary } from '../models/summary.model';
import { Enrollment } from './../services/enrollment';
import { ICreateStudentRequest, IStudent, IUpdateStudentRequest } from '../models/student.model';
import { ICompany } from '../models/company.model';
import { IProgram } from '../models/program.model';
import { IStatus } from '../models/status.model';
import { IChangeStatusRequest, IEnrollment } from '../models/enrollment.model';

import { Student } from './../services/student';
import { Company } from './../services/company';
import { Program } from './../services/program';
import { Status } from './../services/status';


@Service()
export class StudentStore {

    private readonly studentService = inject(Student);
    private readonly companyService = inject(Company);
    private readonly programService = inject(Program);
    private readonly statusService = inject(Status);
    private readonly enrollmentService = inject(Enrollment);

    private readonly initialState: AppState = {
        companies: [],
        programs: [],
        statuses: [],
        students: [],
        enrollments: [],
        statusHistory: [],
        studentViews: []
    };

    private readonly state = new BehaviorSubject<AppState>(this.initialState);

    readonly state$ = this.state.asObservable();

    readonly students$ = this.state$.pipe(
        map(state => state.studentViews)
    );
        
    readonly summary$ = this.state$.pipe(
        map(state => this.buildSummary(state.studentViews))
    );

    load(): void {
        forkJoin({
            students: this.studentService.getAll(),
            companies: this.companyService.getAll(),
            programs: this.programService.getAll(),
            statuses: this.statusService.getAll(),
            enrollments: this.enrollmentService.getAll()
        }).subscribe(data => {

            const studentViews = this.buildStudentViewsFromData(
                data.students, data.companies, data.programs, data.statuses, data.enrollments
            );

            this.setState({
                students: data.students,
                companies: data.companies,
                programs: data.programs,
                statuses: data.statuses,
                enrollments: data.enrollments,
                studentViews
            });

        });

    }

    private setState(state: Partial<AppState>): void {
        this.state.next({
            ...this.state.value,
            ...state
        });
    }

    private buildStudentViewsFromData(
        students: IStudent[],
        companies: ICompany[],
        programs: IProgram[],
        statuses: IStatus[],
        enrollments: IEnrollment[]
    ): IStudentView[] {
        
        return enrollments.map(enrollment => {

            const student = students.find(
                s => s.id === enrollment.studentId
            )!;
            
            const company = companies.find(
                c => c.id === student.companyId
            )!;

            const program = programs.find(
                p => p.id === enrollment.programId
            )!;

            const status = statuses.find(
                s => s.id === enrollment.statusId
            )!;

            return {
                studentId: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                fullName: `${student.firstName} ${student.lastName}`,
                companyId: company.id,
                companyName: company.name,
                enrollmentId: enrollment.id,
                programId: program.id,
                programName: program.name,
                statusId: status.id,
                statusCode: status.code,
                statusName: status.name,
                enrollmentDate: enrollment.enrollmentDate
            };

        });

    }

    private buildSummary(studentViews: IStudentView[]): ISummary {
        return {
            active: studentViews.filter(s => s.statusCode === 'ACTIVE').length,
            companyLeave: studentViews.filter(s => s.statusCode === 'COMPANY_LEAVE').length,
            programLeave: studentViews.filter(s => s.statusCode === 'PROGRAM_LEAVE').length,
            graduated: studentViews.filter(s => s.statusCode === 'GRADUATED').length,
            suspended: studentViews.filter(s => s.statusCode === 'SUSPENDED').length,
            total: studentViews.length
        };
    }

    refresh(): void {
        this.load();
    }

    registerStudent(
        student: ICreateStudentRequest,
    ): void {

        this.studentService
            .create(student)
            .subscribe({
                next: () => this.refresh(),
                error: error => console.error(error)
            });
    }

    updateStudent(
        id: number,
        student: IUpdateStudentRequest
    ): void {

        this.studentService
            .update(id, student)
            .subscribe({

                next: () => this.refresh(),

                error: error => console.error(error)

            });

    }

    deleteStudent(
        id: number
    ): void {

        this.studentService
            .delete(id)
            .subscribe({

                next: () => this.refresh(),

                error: error => console.error(error)

            });

    }

    changeStatus(
        studentId: number,
        request: IChangeStatusRequest
    ): void {

        this.enrollmentService
            .changeStatus(
                studentId,
                request
            )
            .subscribe({
                next: () => this.refresh(),
                error: error => console.error(error)
            });

    }

}