import { useState, type ChangeEvent, type FormEvent } from 'react';

// 🎯 Tipagem avançada: garante que as regras de validação correspondam exatamente às chaves do formulário
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

type UseFormOptions<T> = {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit: (values: T) => void;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});

  // Manipulador genérico para qualquer mudança de input
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value, type } = event.target;

    // Se o input for do tipo numérico, converte o texto para número inteiro de forma segura
    const finalValue = type === 'number' ? parseInt(value, 10) || 0 : value;

    setValues((prev) => ({
      ...prev,
      [id]: finalValue,
    }));

    // Se o campo alterado tinha um erro, limpa ele da tela na mesma hora
    if (errors[id]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[id];
        return nextErrors;
      });
    }
  }

  // Intercepta o envio do formulário e roda as validações cadastradas
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validationRules) {
      onSubmit(values);
      return;
    }

    const localErrors: { [K in keyof T]?: string } = {};
    let hasErrors = false;

    // Roda a função de validação campo por campo
    for (const key in validationRules) {
      const rule = validationRules[key];
      if (rule) {
        const errorResult = rule(values[key]);
        if (errorResult) {
          localErrors[key] = errorResult;
          hasErrors = true;
        }
      }
    }

    // Se encontrou alguma infração, barra o envio e exibe as mensagens
    if (hasErrors) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    onSubmit(values);
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}