export function CardColor(status: string | undefined): string {
  const statusColorMap = new Map<string, string>([
    ['CONFIRMAR', '#9b59b6'],
    ['CONFIRMADO', '#27ae60'],
    ['ATENDIDO', '#3498db'],
    ['DESMARCOU', '#95a5a6'],
    ['FALTOU', '#e67e22'],
  ]);

  return statusColorMap.get(status || '') || '';
}
