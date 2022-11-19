declare module Common {
  type CSSPixelValue = string | number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  type NotNullishValue = {};
  type TransformOrigin = "top" | "right" | "bottom" | "left";
}
declare module Util {
  type SingleOrArray<T> = T | T[];
}

declare module Register {
  type EatingHabit = "Diet" | "Religion";
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
    | "/post"
    | "/post/add"
    | "/notice"
    | "/register/nationality"
    | "/register/eatingHabits";
}
