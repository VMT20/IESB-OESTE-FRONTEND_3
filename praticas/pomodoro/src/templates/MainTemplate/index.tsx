import type { ReactNode } from 'react';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';

type MainTemplateProps = {
  children: ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {/* Aqui entra o conteúdo dinâmico de cada tela */}
      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
