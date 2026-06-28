import { ICompany } from "./company.model";
import { IEnrollment } from "./enrollment.model";
import { IProgram } from "./program.model";
import { IStatusHistory } from "./status-history.model";
import { IStatus } from "./status.model";
import { IStudentView } from "./student-view.model";
import { IStudent } from "./student.model";

export interface AppState {
    companies: ICompany[];
    programs: IProgram[];
    statuses: IStatus[];
    students: IStudent[];
    enrollments: IEnrollment[];
    statusHistory: IStatusHistory[];
    studentViews: IStudentView[];
}