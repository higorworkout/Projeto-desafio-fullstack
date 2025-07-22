export interface Task {
  id: string;
  title: string;
  description: string;
  endDate: string; // ISO
  category: string;
  status: 'pending' | 'in-progress' | 'done';
  collaborators: {
    id: string;
    name: string;
    email: string;
  }[];
}