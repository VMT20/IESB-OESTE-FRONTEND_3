import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { RouterLink } from '../../components/RouterLink';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>404 - Página não encontrada 🚀</Heading>
        <p style={{ marginTop: '2rem', fontSize: '1.6rem', color: 'var(--gray-300)' }}>
          Opa! Parece que a página que você está tentando acessar não existe. 
          Talvez ela tenha tirado férias, resolvido explorar o universo ou se perdido em algum lugar entre dois buracos negros.
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '1.6rem', color: 'var(--gray-300)' }}>
          Mas calma, você não está perdido no espaço (ainda). Dá pra voltar em segurança para a <RouterLink href="/" style={{ color: '#4caf50', textDecoration: 'underline' }}>página principal</RouterLink> ou dar uma olhada no seu <RouterLink href="/history" style={{ color: '#4caf50', textDecoration: 'underline' }}>histórico</RouterLink>.
        </p>
      </Container>
    </MainTemplate>
  );
}