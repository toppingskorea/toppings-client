declare module Common {
  type CSSPixelValue = string | number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  type NotNullishValue = {};
}
declare module Util {
  type SingleOrArray<T> = T | T[];
}
declare module Route {
  type Path =
    | "/"
    | "/map"
    | "/login"
    | "/login/redirect"
    | "/search/restaurant"
    | "/search/local"
    | "/profile"
    | "/text";
}
