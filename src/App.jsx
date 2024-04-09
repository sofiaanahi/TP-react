import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import TaskList from './components/TaskList/TaskList';
import './App.css';

function App() {
  return (
    <div className="container">
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </div>
  );
}

export default App;
