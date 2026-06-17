import type { ComponentProps, ReactNode } from 'react';
import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: ReactNode; // Aceita componentes de ícones da lucide-react
  color?: 'green' | 'red'; // Union Type: Só aceita estritamente essas duas strings
} & ComponentProps<'button'>; // Herda todas as propriedades nativas de um botão HTML

export function DefaultButton({
  icon,
  color = 'green',
  ...props
}: DefaultButtonProps) {
  return (
    /* A mágica do CSS Modules Dinâmico: styles[color] lê styles['green'] ou styles['red'] */
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {icon}
    </button>
  );
}
