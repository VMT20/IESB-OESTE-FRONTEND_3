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
import * as api from '../../services/api'; // 👈 Importando a API

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
    // 🚀 Transformado em async para lidar com a API
    onSubmit: async (formValues) => {
      showMessage.dismiss();

      try {
        // 1. Chama updateSettings(...) na API
        await api.updateSettings(formValues);

        // 2. Em sucesso: mantém atualização no estado global
        dispatch({
          type: TaskActionTypes.CHANGE_SETTINGS,
          payload: formValues,
        });

        showMessage.success('Configurações salvas');
      } catch (error) {
        // 3. Em falha: mostra mensagem de erro
        console.error('Erro ao salvar configurações:', error);
        showMessage.error('Não foi possível salvar as configurações na API.');
      }
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
        <p className="pageDescription">
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
              <span className="formError">
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
              <span className="formError">
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
              <span className="formError">
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