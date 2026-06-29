export interface IStatus {
    id: number;
    code: string;
    name: string;
    description: string;
}

export interface IChangeStatusRequest {
    newStatusCode: string;
    reason: string;
}