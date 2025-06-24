import React, { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const AddCategory: React.FC = () => {
  const [name, setName] = useState('');
  const { addCategory } = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addCategory(name);
      setName('');
    }
  };

  return (
    <div className="add-category-container">
      <h2>Adicionar Nova Categoria</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da Categoria"
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddCategory;