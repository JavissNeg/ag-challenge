export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    companyId: number;
}

export interface ICreateStudentRequest {
    id: number;
    firstName: string;
    lastName: string;
    programId: number;
    companyId: number;
}

export interface IUpdateStudentRequest {
    firstName: string;
    lastName: string;
    companyId: number;
}