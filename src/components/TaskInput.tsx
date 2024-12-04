import React, { useState } from 'react';
import { TaskInputProps } from '../types';
import '../styles/styles.css';

const TaskInput: React.FC<TaskInputProps> = ({ onTaskSubmit }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onTaskSubmit(task.trim());
      setTask('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What are you working on?"
        className="task-input-field"
      />
      <button 
        type="submit" 
        disabled={!task.trim()}
        className="task-submit-button"
      >
        Set Task
      </button>
    </form>
  );
};

export default TaskInput;
