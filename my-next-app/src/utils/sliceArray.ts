export const sliceArray = <T>(array: T[], start: number, end: number): T[] => {
  const result: Array<T> = [];
  for (let i = start; i < end; i++) {
    if (array[i]) result.push(array[i]);
  }

  return result;
};
