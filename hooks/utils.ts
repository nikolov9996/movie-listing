export function findMostFrequentItem(arr: string[]): any | null {
  if (arr.length === 0) {
    return null;
  }

  const countMap: Record<string, number> = {};

  for (const item of arr) {
    const key = String(item);
    countMap[key] = (countMap[key] || 0) + 1;
  }

  let mostFrequentItem: any = arr[0];
  let maxCount = countMap[String(mostFrequentItem)] || 0;

  for (const item in countMap) {
    if (countMap[item] > maxCount) {
      mostFrequentItem = item;
      maxCount = countMap[item];
    }
  }

  return mostFrequentItem;
}
