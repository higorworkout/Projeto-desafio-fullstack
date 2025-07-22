import { createContext, useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import api from '../services/api';

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  removeTask: (id: string) => Promise<void>;
  filteredTasks: Task[]
  setSelectedCategory: (selectedCategory: string) => void;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

    function addTask(newTask: Task) {
        setTasks(prevTasks => [newTask, ...prevTasks]);
    }

    const fetchTasks = async () => {
        const res = await api.get('http://localhost:3000/task', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });
        setTasks(res.data);
    };

    async function removeTask(id: string) {
        await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = selectedCategory === 'Todas'
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

    return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, removeTask, filteredTasks, setSelectedCategory }}>
      {children}
    </TaskContext.Provider>
  );
}

