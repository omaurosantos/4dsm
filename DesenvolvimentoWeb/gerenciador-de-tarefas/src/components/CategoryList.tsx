import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import AddTask from './AddTask';
import TaskList from './TaskList';

const CategoryList: React.FC = () => {
  const { categories } = useContext(TaskContext);

  return (
    <div className="category-list-container">
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <h3>{category.name}</h3>
          <AddTask categoryId={category.id} />
          <TaskList categoryId={category.id} tasks={category.tasks} />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;