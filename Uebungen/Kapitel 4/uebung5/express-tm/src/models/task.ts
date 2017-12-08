export interface Task {
    id: string;
    title: string;
    createdAt: number;
    status: TaskStatus;
}

export enum TaskStatusEnum {
    open = 'open',
    done = 'done'
}

export type TaskStatus = 'open' | 'done';