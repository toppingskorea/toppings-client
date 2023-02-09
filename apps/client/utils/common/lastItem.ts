export function lastItem<T>(arr: Util.NonEmptyArray<T>): T;
export function lastItem<T>(arr: T[]): T | undefined;
export function lastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
