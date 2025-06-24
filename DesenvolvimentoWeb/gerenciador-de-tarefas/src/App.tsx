import React from 'react';
import AddCategory from './components/AddCategory';
import CategoryList from './components/CategoryList';
import { TaskProvider } from './contexts/TaskContext';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <header>
          <h1>Gerenciador de Tarefas</h1>
        </header>
        <main>
          <AddCategory />
          <CategoryList />
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;