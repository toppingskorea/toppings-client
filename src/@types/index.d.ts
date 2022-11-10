declare module Common {
  type CSSPixelValue = string | number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  type NotNullishValue = {};
}
declare module Util {
  type SingleOrArray<T> = T | T[];
}
