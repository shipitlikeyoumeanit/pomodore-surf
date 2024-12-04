import React, { useState, FormEvent } from 'react';
import { TaskInputProps } from '../types';

const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, disabled }) => {
    const [task, setTask] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task.trim()) {
            onSubmit(task);
            setTask('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-input">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter your task..."
                disabled={disabled}
            />
            <button type="submit" disabled={disabled}>
                Set Task
            </button>
        </form>
    );
};

export default TaskInput;
