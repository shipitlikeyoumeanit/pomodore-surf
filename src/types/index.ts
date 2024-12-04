export interface TaskInputProps {
    onSubmit: (task: string) => void;
    disabled: boolean;
}

export interface TimerProps {
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
    onComplete: () => void;
}

export interface AppState {
    currentTask: string;
    isRunning: boolean;
    timeLeft: number;
    sessionCount: number;
    isBreak: boolean;
}
