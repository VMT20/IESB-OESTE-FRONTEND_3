import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'; // Atualizado aqui

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>
      {state.formattedSecondsRemaining}
    </div>
  );
}