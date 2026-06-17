import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { RouterLink } from '../../components/RouterLink';
import { MainTemplate } from '../../templates/MainTemplate';

export function AboutPomodoro() {
  useEffect(() => {
    document.title = 'Entenda a Técnica Pomodoro - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>A Técnica Pomodoro 🍅</Heading>
        
        <div style={{ marginTop: '3rem', textAlign: 'left', color: 'var(--gray-300)', fontSize: '1.6rem', lineHeight: '1.8' }}>
          <p>
            Criada pelo italiano Francesco Cirillo no final dos anos 80, a <strong>Técnica Pomodoro</strong> é um dos métodos de produtividade mais famosos do mundo. A ideia central é usar o tempo como um aliado, dividindo o trabalho em blocos de foco absoluto para evitar distrações e estafa mental.
          </p>
          
          <h3 style={{ color: '#4caf50', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '2rem' }}>O Fluxo de Trabalho Clássico:</h3>
          <ul style={{ paddingLeft: '2.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><strong>1. Foco Total (25 min):</strong> Escolha uma atividade do seu dia e trabalhe nela sem interrupções até o cronômetro zerar.</li>
            <li><strong>2. Descanso Curto (5 min):</strong> Faça uma pausa rápida para respirar, beber água ou esticar as pernas. Evite olhar redes sociais.</li>
            <li><strong>3. Repetição de Ciclos:</strong> Cada bloco de foco é chamado de "um pomodoro". Repita esse processo por 4 vezes consecutivas.</li>
            <li><strong>4. Descanso Longo (15 a 30 min):</strong> Após completar os 4 ciclos de foco, dê uma pausa maior para seu cérebro recuperar as energias antes da próxima rodada.</li>
          </ul>
        </div>

        <p style={{ marginTop: '3rem', fontSize: '1.6rem', color: 'var(--gray-300)' }}>
          No Chronos, você tem controle total! É possível customizar todos esses intervalos na nossa <RouterLink href="/settings" style={{ color: '#4caf50', textDecoration: 'underline' }}>página de configurações</RouterLink> de acordo com o seu ritmo de estudos.
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '1.6rem', color: 'var(--gray-300)' }}>
          Tudo o que você produz fica registrado de forma segura no painel de <RouterLink href="/history" style={{ color: '#4caf50', textDecoration: 'underline' }}>histórico</RouterLink> para você acompanhar a sua evolução.
        </p>
        <p style={{ marginTop: '3rem', fontSize: '1.6rem', fontWeight: 'bold', textAlign: 'center' }}>
          Pronto para decolar seu foco? <RouterLink href="/" style={{ color: '#4caf50', textDecoration: 'underline' }}>Voltar para a página inicial e começar!</RouterLink> 🚀
        </p>
      </Container>
    </MainTemplate>
  );
}