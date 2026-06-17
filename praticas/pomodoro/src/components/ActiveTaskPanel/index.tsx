import { StopCircleIcon } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { DefaultButton } from '../DefaultButton';
import { showMessage } from '../../adapters/showMessage'; // Importado o disparador

export function ActiveTaskPanel() {
  const { state, dispatch } = useTaskContext();

  function handleStopCountdown() {
    showMessage.dismiss();
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    showMessage.error('Tarefa interrompida!'); // 🎯 Notificação adicionada no clique real!
  }

  return (
    <div className="form" style={{ textAlign: 'center' }}>
      <div className="formRow">
        <p>Trabalhando em: <strong>{state.activeTask?.name}</strong></p>
      </div>

      <div className="formRow">
        <DefaultButton
          aria-label="Interromper tarefa atual"
          title="Interromper tarefa atual"
          icon={<StopCircleIcon />}
          color="red"
          type="button"
          onClick={handleStopCountdown}
        />
      </div>
    </div>
  );
}