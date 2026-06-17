import type { TaskModel } from '../models/TaskModel';

// Define os parâmetros esperados pela função
export type SortTasksOptions = {
  tasks: TaskModel[];
  direction?: 'asc' | 'desc';
  field?: keyof TaskModel;
};

export function sortTasks({
  tasks = [],
  direction = 'desc',
  field = 'startDate',
}: SortTasksOptions): TaskModel[] {
  // O spread [...tasks] cria uma cópia do array original para não alterá-lo direto no estado
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // --- TRATANDO VALORES NULOS ---
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1; // Joga nulos para o final
    if (bValue === null) return -1;

    // --- COMPARAÇÃO NUMÉRICA ---
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }

    // --- COMPARAÇÃO DE STRINGS ---
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
}