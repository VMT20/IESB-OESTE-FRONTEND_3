import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string; // Identificador único da tarefa (id gerado automaticamente)
  name: string; // Nome da tarefa digitado no input
  duration: number; // Duração em minutos
  startDate: number; // Timestamp de quando começou (Date.now())
  completedDate: number | null; // Timestamp de quando o timer chegou ao final
  interruptDate: number | null; // Timestamp de quando a task foi interrompida pelo botão Stop
  type: keyof TaskStateModel['config']; // 'workTime' | 'shortBreakTime' | 'longBreakTime'
};
