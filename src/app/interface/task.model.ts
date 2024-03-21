export interface Task {
    id?: number;
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    completionDate?: Date;
    status: 'Pending' | 'In Progress' | 'Completed';
    userId?: number;
    categoryId?: number;
  }