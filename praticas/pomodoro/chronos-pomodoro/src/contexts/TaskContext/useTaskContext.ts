import { useContext } from 'react';
import { TaskContext } from './TaskContextProvider'; // 🚀 O pulo do gato! Apontando para o NOSSO Provider real

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskContextProvider');
  }

  return context;
}