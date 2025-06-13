export interface Task {
  id: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'P1' | 'P2' | 'P3';
} 