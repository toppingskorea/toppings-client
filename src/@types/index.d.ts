declare module Common {
  type CSSPixelValue = string | number;
  type TransformOrigin = "top" | "right" | "bottom" | "left";
}
declare module Util {
  type SingleOrArray<T> = T | T[];
  type PropsWithChild<P = unknown> = P & { children: JSX.Element };
}
