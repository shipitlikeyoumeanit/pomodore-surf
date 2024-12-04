import React, { useState } from 'react';
import Timer from './Timer';
import TaskInput from './TaskInput';
import { AppState } from '../types';
import '../styles/styles.css';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentTask: '',
    sessionCount: 0,
    isBreak: false
  });

  const WORK_DURATION = 25 * 60; // 25 minutes
  const BREAK_DURATION = 5 * 60;  // 5 minutes

  const handleSessionComplete = () => {
    setState(prev => ({
      ...prev,
      sessionCount: (prev.sessionCount + 1) % 4,
      isBreak: !prev.isBreak
    }));
  };

  const handleTaskSubmit = (task: string) => {
    setState(prev => ({
      ...prev,
      currentTask: task
    }));
  };

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <TaskInput onTaskSubmit={handleTaskSubmit} />
      {state.currentTask && <p className="current-task">Current Task: {state.currentTask}</p>}
      <Timer
        workDuration={WORK_DURATION}
        breakDuration={BREAK_DURATION}
        onSessionComplete={handleSessionComplete}
      />
    </div>
  );
};

export default App;
