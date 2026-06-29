export interface IEnrollment {
    id: number;
    studentId: number;
    programId: number;
    statusId: number;
    enrollmentDate: Date;
}

export interface IChangeStatusRequest {
    newStatusCode: string;
    reason: string;
}