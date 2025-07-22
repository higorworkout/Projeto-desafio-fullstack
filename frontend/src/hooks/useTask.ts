import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; 

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de um AuthProvider');
  }
  return context;
}