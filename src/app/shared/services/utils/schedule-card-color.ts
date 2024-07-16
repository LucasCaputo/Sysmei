export function CardColor(status: number | undefined): string {
  const statusColorMap = new Map<number, string>([
    [0, 'purple'],
    [1, 'green'],
    [2, 'burlywood'],
    [3, 'blue'],
    [4, 'gray'],
    [5, 'burlywood'],
  ]);

  return statusColorMap.get(status ?? -1) || '';
}
