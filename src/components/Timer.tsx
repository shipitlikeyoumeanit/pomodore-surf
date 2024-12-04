import React, { useState, useEffect, useCallback } from 'react';
import { TimerProps, TimerState, TimerMode } from '../types';
import '../styles/styles.css';

const Timer: React.FC<TimerProps> = ({ workDuration, breakDuration, onSessionComplete }) => {
  const [state, setState] = useState<TimerState>({
    timeLeft: workDuration,
    isRunning: false,
    isBreak: false,
    sessionsCompleted: 0
  });

  const handleSkip = useCallback(() => {
    const nextMode: TimerMode = state.isBreak ? 'work' : 'break';
    const nextDuration = nextMode === 'work' ? workDuration : breakDuration;
    
    setState(prev => ({
      ...prev,
      timeLeft: nextDuration,
      isBreak: !prev.isBreak,
      isRunning: false,
      sessionsCompleted: prev.isBreak ? prev.sessionsCompleted : prev.sessionsCompleted + 1
    }));

    if (!state.isBreak) {
      onSessionComplete();
    }
  }, [state.isBreak, workDuration, breakDuration, onSessionComplete]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state.isRunning && state.timeLeft > 0) {
      timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      handleSkip();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [state.isRunning, state.timeLeft, handleSkip]);

  const toggleTimer = () => {
    setState(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetTimer = () => {
    setState(prev => ({
      ...prev,
      timeLeft: prev.isBreak ? breakDuration : workDuration,
      isRunning: false
    }));
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="timer-display">
        <h2>{state.isBreak ? 'Break Time!' : 'Work Time'}</h2>
        <div className="time">{formatTime(state.timeLeft)}</div>
        <div className="session-count">Session: {state.sessionsCompleted + 1}/4</div>
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {state.isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
};

export default Timer;
