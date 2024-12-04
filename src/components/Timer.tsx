import React, { useEffect, useCallback } from 'react';
import { TimerProps } from '../types';

const Timer: React.FC<TimerProps> = ({
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    onComplete
}) => {
    const handleTimeUpdate = useCallback(() => {
        setTimeLeft(prevTime => {
            if (prevTime <= 1) {
                setIsRunning(false);
                onComplete();
                return 0;
            }
            return prevTime - 1;
        });
    }, [setTimeLeft, setIsRunning, onComplete]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        
        if (isRunning && timeLeft > 0) {
            interval = setInterval(handleTimeUpdate, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, timeLeft, handleTimeUpdate]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const toggleTimer = (): void => {
        setIsRunning(!isRunning);
    };

    const resetTimer = (): void => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
    };

    return (
        <div className="timer">
            <div className="time-display">{formatTime(timeLeft)}</div>
            <div className="timer-controls">
                <button onClick={toggleTimer}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
