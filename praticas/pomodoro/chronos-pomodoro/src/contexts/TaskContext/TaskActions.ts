import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  RESET_STATE: 'RESET_STATE',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS', // 🎯 Sincronizado com o slide image_963c06.png
} as const;

export type TaskActionsWithPayload =
  | { type: typeof TaskActionTypes.START_TASK; payload: TaskModel }
  | { type: typeof TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | { 
      type: typeof TaskActionTypes.CHANGE_SETTINGS; 
      payload: { workTime: number; shortBreakTime: number; longBreakTime: number } 
    }; // Payload direto com os tempos

export type TaskActionsWithoutPayload =
  | { type: typeof TaskActionTypes.INTERRUPT_TASK }
  | { type: typeof TaskActionTypes.COMPLETE_TASK }
  | { type: typeof TaskActionTypes.RESET_STATE };

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload;