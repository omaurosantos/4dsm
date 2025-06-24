import React, { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

interface AddTaskProps {
  categoryId: number;
}

const AddTask: React.FC<AddTaskProps> = ({ categoryId }) => {
  const [text, setText] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(categoryId, text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicionar Tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddTask;