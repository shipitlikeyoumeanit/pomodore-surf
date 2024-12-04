import React, { useState } from 'react';
import Timer from './Timer';
import TaskInput from './TaskInput';
import { AppState } from '../types';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        currentTask: '',
        isRunning: false,
        timeLeft: 25 * 60,
        sessionCount: 0,
        isBreak: false
    });

    const handleTaskSubmit = (task: string): void => {
        setState(prev => ({ ...prev, currentTask: task }));
    };

    const handleTimerComplete = (): void => {
        if (!state.isBreak) {
            // Completed a work session
            const newSessionCount = state.sessionCount + 1;
            setState(prev => ({
                ...prev,
                sessionCount: newSessionCount,
                isBreak: true,
                timeLeft: 5 * 60,
                isRunning: false
            }));

            if (newSessionCount >= 4) {
                // Reset after 4 sessions
                setState(prev => ({
                    ...prev,
                    sessionCount: 0,
                    currentTask: '',
                    timeLeft: 25 * 60
                }));
            }
        } else {
            // Break is over, start new work session
            setState(prev => ({
                ...prev,
                isBreak: false,
                timeLeft: 25 * 60,
                isRunning: false
            }));
        }
    };

    return (
        <div className="app-container">
            <h1>Pomodoro Timer</h1>
            <div className="session-info">
                Session {state.sessionCount + 1}/4 {state.isBreak ? '(Break)' : '(Work)'}
            </div>
            <TaskInput 
                onSubmit={handleTaskSubmit}
                disabled={state.isRunning}
            />
            <div className="current-task">
                {state.currentTask && <p>Current Task: {state.currentTask}</p>}
            </div>
            <Timer 
                timeLeft={state.timeLeft}
                setTimeLeft={(newTime) => setState(prev => ({ ...prev, timeLeft: typeof newTime === 'function' ? newTime(prev.timeLeft) : newTime }))}
                isRunning={state.isRunning}
                setIsRunning={(running) => setState(prev => ({ ...prev, isRunning: running }))}
                onComplete={handleTimerComplete}
            />
        </div>
    );
};

export default App;
