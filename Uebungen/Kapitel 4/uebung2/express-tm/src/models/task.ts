export interface Task {
    id: string;
    title: string;
    createdAt: number;
    status: TaskStatus;
}

export enum TaskStatus {
    open = 'open',
    done = 'done'
}