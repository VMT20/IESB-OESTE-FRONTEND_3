// 🎯 CORREÇÃO: Adicionado o 'type' antes do InputHTMLAttributes para o modo rigoroso da faculdade
import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ labelText, ...rest }, ref) => {
    return (
      <>
        <label htmlFor={rest.id} className={styles.label}>
          {labelText}
        </label>
        <input ref={ref} {...rest} className={styles.input} />
      </>
    );
  }
);

DefaultInput.displayName = 'DefaultInput';