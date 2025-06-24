import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import type { Task } from '../types/index.ts';

interface TaskListProps {
  categoryId: number;
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ categoryId, tasks }) => {
  const { toggleTask } = useContext(TaskContext);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(categoryId, task.id)}
          />
          <span>{task.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;