export interface CreateTaskDTO {
  title: string;
  description: string;
  endDate: Date; // ISO string
  category: string;
  owner: string;
  status: 'pending' | 'in-progress' | 'done';
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  endDate?: Date;
  category?: string;
  status?: 'pending' | 'in-progress' | 'done';
}

export interface CollaboratorDTO {
  collaboratorEmail: string;
}