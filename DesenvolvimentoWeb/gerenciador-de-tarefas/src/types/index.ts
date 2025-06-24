export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface Category {
  id: number;
  name: string;
  tasks: Task[];
}