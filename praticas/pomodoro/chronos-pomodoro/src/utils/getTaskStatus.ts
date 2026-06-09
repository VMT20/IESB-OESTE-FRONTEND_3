import type { TaskModel } from '../models/TaskModel';

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completedDate) return 'Completa';
  if (task.interruptDate) return 'Interrompida';
  if (activeTask && task.id === activeTask.id) return 'Em Progresso';
  return 'Abandonada';
}