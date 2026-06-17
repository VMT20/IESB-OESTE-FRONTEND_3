import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  // 1. Cria um array com o tamanho exato do ciclo atual
  const cycleStep = Array.from({ length: state.currentCycle });

  // 2. Dicionário para traduzir os tipos de ciclo para texto legível
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          // O índice começa em 0. Usamos as funções para saber o tipo real do ciclo
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          return (
            <span
              key={nextCycle} // Prop 'key' obrigatória no React
              className={`${styles.cycleDot} ${styles[nextCycleType]}`} // Cores dinâmicas
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`} // Acessibilidade
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}