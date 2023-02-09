type NonEmptyArray<T> = [T, ...T[]];

export function lastItem<T>(arr: NonEmptyArray<T>): T;
export function lastItem<T>(arr: T[]): T | undefined;
export function lastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
