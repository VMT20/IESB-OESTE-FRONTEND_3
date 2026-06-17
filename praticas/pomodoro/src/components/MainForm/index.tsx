import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { Tips } from '../Tips';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { showMessage } from '../../adapters/showMessage';
import * as api from '../../services/api';

// 🎵 Importando o áudio para tocar no clique
import beepSound from '../../assets/audios/gravitational_beep.mp3';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  async function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa!');
      return;
    }

    const dynamicDuration = state.config?.[nextCycleType] || 25;

    const newTask = {
      id: String(Date.now()),
      name: taskName,
      duration: dynamicDuration,
      startDate: Date.now(),
      completedDate: null,
      interruptDate: null,
      type: nextCycleType as any,
    };

    try {
      await api.createTask(newTask);
      dispatch({ type: 'START_TASK', payload: newTask });
      showMessage.success('Tarefa iniciada com sucesso!');

      // 🔊 Toca o som imediatamente após o clique!
      const startAudio = new Audio(beepSound);
      startAudio.play().catch(err => console.error('Erro no áudio de início:', err));

    } catch (error) {
      console.error('Erro ao criar tarefa na API:', error);
      showMessage.error('Não foi possível iniciar a tarefa na API.');
    }
  }

  async function handleInterruptTask() {
    if (!state.activeTask) return;
    showMessage.dismiss();

    try {
      await api.interruptTask(state.activeTask.id, Date.now());
    } catch (error) {
      console.warn('A tarefa já não existia na API, forçando interrupção local...');
    } finally {
      dispatch({ type: 'INTERRUPT_TASK' });
      showMessage.error('Tarefa interrompida!');
    }
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form">
      <div className="formRow">
        <DefaultInput
          ref={taskNameInput}
          labelText="task"
          id="meuInput"
          type="text"
          placeholder="No que você vai trabalhar agora?"
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
          autoComplete="off"
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="botao_button"
          />
        )}
      </div>
    </form>
  );
}