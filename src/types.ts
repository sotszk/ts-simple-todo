export interface Todo {
  id: number;
  text: string;
  status: 'todo' | 'done';
  createdAt: Date;
  completedAt?: Date;
}
