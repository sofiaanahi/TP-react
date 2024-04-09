import React, { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

function TaskList() {
  const { tasks, setTasks, newTask, setNewTask, filter, setFilter } = useTaskContext();
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleComplete = (taskId) => {
    toggleTaskCompletion(taskId);
    setCompletedTasks([...completedTasks, taskId]);
    setFilter('completed');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // En caso de que se añadan más filtros en el futuro
  });

  return (
    <div>
      <div className="task-input-container">
        <input
          className="task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button className="task-add-button" onClick={addTask}>Agregar</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.text}
            {filter === 'all' && !completedTasks.includes(task.id) && (
              <button className="complete-button" onClick={() => handleComplete(task.id)}>Completar</button>
            )}
            {filter === 'pending' && (
              <button className="complete-button" onClick={() => handleComplete(task.id)}>Completar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
