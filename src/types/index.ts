export interface TaskInputProps {
    onTaskSubmit: (task: string) => void;
}

export interface TimerProps {
    workDuration: number;
    breakDuration: number;
    onSessionComplete: () => void;
}

export interface TimerState {
    timeLeft: number;
    isRunning: boolean;
    isBreak: boolean;
    sessionsCompleted: number;
}

export interface AppState {
    currentTask: string;
    sessionCount: number;
    isBreak: boolean;
}

export type TimerMode = 'work' | 'break';
