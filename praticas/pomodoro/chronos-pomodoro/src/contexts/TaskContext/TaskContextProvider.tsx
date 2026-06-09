import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

const LOCAL_STORAGE_KEY = '@chronos:task-state-v1.0.0';

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, (initialState) => {
    const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedStateAsJSON) {
      try { return JSON.parse(storedStateAsJSON); } catch { return initialState; }
    }
    return initialState;
  });

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();

  // Sincroniza LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Gatilho do som de Beep
  useEffect(() => {
    if (!state.activeTask) {
      playBeepRef.current = null;
      return;
    }

    if (state.activeTask && playBeepRef.current === null) {
      const play = loadBeep();
      playBeepRef.current = play;
      play();
    }
  }, [state.activeTask]);

  // Escuta as mensagens do Web Worker
  useEffect(() => {
    worker.onmessage((event) => {
      const countDownSeconds = event.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
        }
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  // 🎯 Sincroniza o estado com o Worker e atualiza o Título da Aba dinamicamente
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      document.title = 'Chronos Pomodoro'; // Reseta o título quando não houver foco ativo
      return;
    }

    // Alinhado perfeitamente com o slide image_9733c6.png
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    
    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}