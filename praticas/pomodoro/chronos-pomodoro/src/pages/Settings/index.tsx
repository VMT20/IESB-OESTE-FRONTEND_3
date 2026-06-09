import { useEffect } from 'react';
import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { showMessage } from '../../adapters/showMessage';
import { useForm } from '../../hooks/useForm';

type SettingsFormValues = {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
};

export function Settings() {
  const { state, dispatch } = useTaskContext();

  // 🎯 Atualiza o título da aba para as Configurações
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  const validationRules = {
    workTime: (val: number) => 
      val < 1 || val > 99 ? 'Digite valores entre 1 e 99 para foco' : null,
    shortBreakTime: (val: number) => 
      val < 1 || val > 30 ? 'Digite valores entre 1 e 30 para descanso curto' : null,
    longBreakTime: (val: number) => 
      val < 1 || val > 60 ? 'Digite valores entre 1 e 60 para descanso longo' : null,
  };

  const { values, errors, handleChange, handleSubmit } = useForm<SettingsFormValues>({
    initialValues: {
      workTime: state.config.workTime,
      shortBreakTime: state.config.shortBreakTime,
      longBreakTime: state.config.longBreakTime,
    },
    validationRules,
    onSubmit: (formValues) => {
      showMessage.dismiss();

      dispatch({
        type: TaskActionTypes.CHANGE_SETTINGS,
        payload: formValues,
      });

      showMessage.success('Configurações salvas');
    },
  });

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Configurações</span>
        </Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center', color: 'var(--gray-300)', marginBottom: '2rem' }}>
          Modifique as configurações para tempo de foco, descanso curto e descanso longo.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="formRow">
            <DefaultInput
              labelText="Foco"
              id="workTime"
              type="number"
              value={values.workTime}
              onChange={handleChange}
            />
            {errors.workTime && (
              <span style={{ color: 'var(--red-500)', fontSize: '1.4rem', marginTop: '0.5rem', display: 'block' }}>
                {errors.workTime}
              </span>
            )}
          </div>

          <div className="formRow">
            <DefaultInput
              labelText="Descanso curto"
              id="shortBreakTime"
              type="number"
              value={values.shortBreakTime}
              onChange={handleChange}
            />
            {errors.shortBreakTime && (
              <span style={{ color: 'var(--red-500)', fontSize: '1.4rem', marginTop: '0.5rem', display: 'block' }}>
                {errors.shortBreakTime}
              </span>
            )}
          </div>

          <div className="formRow">
            <DefaultInput
              labelText="Descanso longo"
              id="longBreakTime"
              type="number"
              value={values.longBreakTime}
              onChange={handleChange}
            />
            {errors.longBreakTime && (
              <span style={{ color: 'var(--red-500)', fontSize: '1.4rem', marginTop: '0.5rem', display: 'block' }}>
                {errors.longBreakTime}
              </span>
            )}
          </div>

          <div className="formRow">
            <DefaultButton
              type="submit"
              title="Salvar configurações"
              aria-label="Salvar configurações"
              icon={<SaveIcon />}
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}