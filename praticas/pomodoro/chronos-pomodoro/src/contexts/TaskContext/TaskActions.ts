import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  RESET_STATE: 'RESET_STATE',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
  CLEAR_TASKS: 'CLEAR_TASKS',     // 🚀 Adicionado
  HYDRATE_TASKS: 'HYDRATE_TASKS', // 🚀 Adicionado
} as const;

export type TaskActionsWithPayload =
  | { type: typeof TaskActionTypes.START_TASK; payload: TaskModel }
  | { type: typeof TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | {
      type: typeof TaskActionTypes.CHANGE_SETTINGS;
      payload: { workTime: number; shortBreakTime: number; longBreakTime: number };
    }
  | {
      type: typeof TaskActionTypes.HYDRATE_TASKS;
      payload: {
        tasks: TaskModel[];
        settings: { workTime: number; shortBreakTime: number; longBreakTime: number };
      };
    }; // 🚀 Adicionado

export type TaskActionsWithoutPayload =
  | { type: typeof TaskActionTypes.INTERRUPT_TASK }
  | { type: typeof TaskActionTypes.COMPLETE_TASK }
  | { type: typeof TaskActionTypes.RESET_STATE }
  | { type: typeof TaskActionTypes.CLEAR_TASKS }; // 🚀 Adicionado

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload;