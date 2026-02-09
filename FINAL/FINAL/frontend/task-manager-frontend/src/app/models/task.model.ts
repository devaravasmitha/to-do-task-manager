import { Category } from './category.model';
import { User } from './user.model';

export interface Person {
  name: string;
  email: string;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED';
  dueDate?: string | null;
  teamName?: string;
  assignedTo: Person[];

}
