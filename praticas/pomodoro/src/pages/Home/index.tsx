import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { CountDown } from '../../components/CountDown';

export function Home() {
  // 🎯 Define o título padrão da aplicação ao carregar a Home
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}