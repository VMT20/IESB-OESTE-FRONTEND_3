import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { taskReducer } from './taskReducer';
import { TaskActionTypes } from './TaskActions';
import { initialTaskState } from './initialTaskState';
import type { TaskStateModel } from '../../models/TaskStateModel';
import * as api from '../../services/api';
import beepSound from '../../assets/audios/gravitational_beep.mp3';

interface TaskContextProps {
  state: TaskStateModel;
  dispatch: React.Dispatch<any>;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

export const TaskContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  // 🚀 Nova referência física para o áudio no DOM
  const audioRef = useRef<HTMLAudioElement>(null); 

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [settings, rawTasks] = await Promise.all([
          api.getSettings(),
          api.getTasks()
        ]);

        const tasks = rawTasks.map((task: any) => ({
          ...task,
          duration: Number(task.duration),
          startDate: Number(task.startDate),
          completedDate: task.completedDate ? Number(task.completedDate) : null,
          interruptDate: task.interruptDate ? Number(task.interruptDate) : null,
        }));

        dispatch({
          type: TaskActionTypes.HYDRATE_TASKS,
          payload: { settings, tasks }
        });
      } catch (error) {
        console.error('API indisponível. Mantendo fallback local.', error);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    let timer: any;
    
    if (state.activeTask && state.secondsRemaining > 0) {
      timer = setTimeout(() => {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: state.secondsRemaining - 1 }
        });
      }, 1000);
    } else if (state.activeTask && state.secondsRemaining === 0) {
      
      // 🎵 Dispara o áudio a partir da tag HTML
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Erro de áudio:", err));
      }
      
      api.completeTask(state.activeTask.id, Date.now())
        .catch(err => console.error('Erro ao concluir tarefa na API:', err));

      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
    }

    return () => clearTimeout(timer);
  }, [state.activeTask, state.secondsRemaining]);

  useEffect(() => {
    if (state.activeTask) {
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    } else {
      document.title = 'Chronos Pomodoro';
    }
  }, [state.activeTask, state.formattedSecondsRemaining]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {/* 🎵 Elemento HTML invisível renderizado na tela */}
      <audio ref={audioRef} src={beepSound} preload="auto" />
      {children}
    </TaskContext.Provider>
  );
};