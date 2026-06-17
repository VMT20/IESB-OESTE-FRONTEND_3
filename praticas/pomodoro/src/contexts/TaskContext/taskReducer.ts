import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes } from './TaskActions';

export function taskReducer(state: TaskStateModel, action: any): TaskStateModel {
  switch (action.type) {
    case 'START_TASK':
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = Number(newTask.duration) * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }

    case 'INTERRUPT_TASK':
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case 'COUNT_DOWN':
    case TaskActionTypes.COUNT_DOWN: {
      const nextSeconds = action.payload.secondsRemaining;
      return {
        ...state,
        secondsRemaining: nextSeconds,
        formattedSecondsRemaining: formatSecondsToMinutes(nextSeconds),
      };
    }

    case 'COMPLETE_TASK':
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completedDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case 'RESET_STATE':
    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState };
    }

    case 'CHANGE_SETTINGS':
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: { ...action.payload },
      };
    }

    case 'CLEAR_TASKS':
    case TaskActionTypes.CLEAR_TASKS: {
      return {
        ...state,
        tasks: [],
        currentCycle: 0, // 👈 A mágica das bolinhas sumindo aqui!
      };
    }

    case 'HYDRATE_TASKS':
    case TaskActionTypes.HYDRATE_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        config: { ...action.payload.settings },
      };
    }

    default:
      return state;
  }
}