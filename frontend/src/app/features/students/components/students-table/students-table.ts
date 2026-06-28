import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { StudentStore } from '../../../../stores/student-store';
import { IStudentView } from '../../../../models/student-view.model';
import { StatusChip } from '../../../../shared/components/status-chip/status-chip';

import { RegistrationDialog } from '../../../registration/components/registration-dialog/registration-dialog';
import { ChangeStatusDialog } from '../../../change-status/components/change-status-dialog/change-status-dialog';

@Component({
    selector: 'app-students-table',
    standalone: true,
    templateUrl: './students-table.html',
    styleUrl: './students-table.scss',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        StatusChip
    ]
})
export class StudentsTable implements AfterViewInit {

    readonly store = inject(StudentStore);
    private readonly dialog = inject(MatDialog);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    readonly searchControl = new FormControl('');
    readonly programControl = new FormControl('');
    readonly statusControl = new FormControl('');

    readonly displayedColumns = [
        'student',
        'company',
        'program',
        'status',
        'actions'
    ];

    readonly dataSource = new MatTableDataSource<IStudentView>();

    readonly students$ = combineLatest([
        this.store.students$,
        this.searchControl.valueChanges.pipe(startWith('')),
        this.programControl.valueChanges.pipe(startWith('')),
        this.statusControl.valueChanges.pipe(startWith(''))
    ]).pipe(

        map(([students, search, program, status]) => {

            return students.filter(student => {

                const matchesSearch =
                    student.fullName
                        .toLowerCase()
                        .includes(
                            (search ?? '')
                                .toLowerCase()
                        );

                const matchesProgram =
                    !program ||
                    student.programName === program;

                const matchesStatus =
                    !status ||
                    student.statusCode === status;

                return (
                    matchesSearch &&
                    matchesProgram &&
                    matchesStatus
                );

            });

        })

    );

    constructor() {
        this.store.load();

        this.students$
            .subscribe(students => {
                this.dataSource.data = students;
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    registerStudent(): void {
		this.dialog.open(
            RegistrationDialog,
            {
                width: '720px',
                disableClose: true
            }
        );
    }

    changeStatus(
        student: IStudentView
    ): void {
		this.dialog.open(
            ChangeStatusDialog,
            {
                width: '600px',
                disableClose: true,
                data: student
            }
        );
    }

}