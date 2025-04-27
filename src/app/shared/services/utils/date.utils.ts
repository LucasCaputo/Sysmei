export function getStartAndEndOfWeekDateFomat(date: Date): {
  startDate: Date;
  endDate: Date;
} {
  // Criar uma nova data baseada na data fornecida
  const current = new Date(date);

  // Encontrar o dia da semana atual (0 - Domingo, 1 - Segunda, etc.)
  const dayOfWeek = current.getDay();

  // Calcular a diferença em dias até o início da semana (Domingo)
  const startDiff = current.getDate() - dayOfWeek;

  // Calcular a diferença em dias até o final da semana (Sábado)
  const endDiff = current.getDate() + (7 - dayOfWeek);

  // Criar novas datas para o início e o fim da semana
  const startOfWeek = new Date(current.setDate(startDiff));
  const endOfWeek = new Date(current.setDate(endDiff));

  // Retornar o início e o fim da semana formatados

  return {
    startDate: startOfWeek,
    endDate: endOfWeek,
  };
}

// Função auxiliar para formatar a data como YYYY-MM-DD
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatViewDate = (date: string): string => {
  if (date.length < 10) {
    console.error('Date length is invalid');
    return '';
  }
  return `${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(2, 4)}`;
};

export function getCurrentHour(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = '00';
  return `${hours}:${minutes}`;
}

export function getNextHour(): string {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = '00';
  return `${hours}:${minutes}`;
}
