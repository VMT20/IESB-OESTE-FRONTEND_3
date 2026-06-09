import styles from './styles.module.css'; // Ajustado aqui!
import type { ReactNode } from 'react';

type HeadingProps = {
  children: ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return <h1 className={styles.heading}>{children}</h1>;
}
