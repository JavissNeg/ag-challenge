export interface StatusHistory {
    id: number;
    enrollmentId: number;
    previousStatusId: number | null;
    newStatusId: number;
    changedAt: Date;
    reason: string;
}