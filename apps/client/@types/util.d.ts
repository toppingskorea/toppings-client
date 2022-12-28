declare module Util {
  type SingleOrArray<T> = T | T[];
  type ValueOf<T> = T[keyof T];
  type PropsWithChild<P = unknown> = P & {
    children: JSX.Element | JSX.Element[];
  };
  type ElementType<T extends readonly unknown[]> = T[number];
}
