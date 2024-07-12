import { UntypedFormControl } from '@angular/forms';

export function checkName(input: UntypedFormControl) {
  const hasNumber = /[0-9]/.test(input.value);

  if (hasNumber) return { hasNumber: true };
  else {
    const name = input.value.split(' ');

    const filtrado = name.filter((x: string) => {
      if (x != '' && x.length > 1) return { isNameComplete: true };

      return null;
    });

    return filtrado.length < 2 ? { isNameComplete: true } : null;
  }
}

export function getStartAndEndOfWeek(date: Date): { startOfWeek: string, endOfWeek: string } {
  // Criar uma nova data baseada na data fornecida
  const current = new Date(date);
  
  // Encontrar o dia da semana atual (0 - Domingo, 1 - Segunda, etc.)
  const dayOfWeek = current.getDay();

  // Calcular a diferença em dias até o início da semana (Domingo)
  const startDiff = current.getDate() - dayOfWeek;
  
  // Calcular a diferença em dias até o final da semana (Sábado)
  const endDiff = current.getDate() + (6 - dayOfWeek);

  // Criar novas datas para o início e o fim da semana
  const startOfWeek = new Date(current.setDate(startDiff));
  const endOfWeek = new Date(current.setDate(endDiff));

  // Retornar o início e o fim da semana formatados
  return {
      startOfWeek: formatDate(startOfWeek),
      endOfWeek: formatDate(endOfWeek)
  };
}

// Função auxiliar para formatar a data como YYYY-MM-DD
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
