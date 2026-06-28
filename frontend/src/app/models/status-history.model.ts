export interface IStatusHistory {
    id: number;
    enrollmentId: number;
    previousStatusId: number | null;
    newStatusId: number;
    changedAt: Date;
    reason: string;
}