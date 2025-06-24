import React, { createContext, useState, type ReactNode } from 'react';
import type { Category, Task } from '../types/index.ts';

interface TaskContextData {
  categories: Category[];
  addCategory: (name: string) => void;
  addTask: (categoryId: number, taskText: string) => void;
  toggleTask: (categoryId: number, taskId: number) => void;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now(),
      name,
      tasks: [],
    };
    setCategories([...categories, newCategory]);
  };

  const addTask = (categoryId: number, taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, tasks: [...category.tasks, newTask] }
          : category
      )
    );
  };

  const toggleTask = (categoryId: number, taskId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : category
      )
    );
  };

  return (
    <TaskContext.Provider value={{ categories, addCategory, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};