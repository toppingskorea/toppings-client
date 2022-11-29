declare module Common {
  type CSSPixelValue = string | number;
  type TransformOrigin = "top" | "right" | "bottom" | "left";
  // eslint-disable-next-line @typescript-eslint/ban-types
  type NotNullishValue = {};
  type TransformOrigin = "top" | "right" | "bottom" | "left";
  type EatingHabit = "Diet" | "Religion";
}

declare module Util {
  type SingleOrArray<T> = T | T[];
  type ValueOf<T> = T[keyof T];
  type PropsWithChild<P = unknown> = P & {
    children: JSX.Element | JSX.Element[];
  };
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
    | "/profile/edit"
    | "/profile/edit/nationality"
    | "/profile/edit/eatingHabits"
    | "/post"
    | "/post/add"
    | "/notice"
    | "/register/nationality"
    | "/register/eatingHabits";
}

declare module Profile {
  interface UserDTO {
    id: number;
    name: string;
    country: string;
    habits: {
      title: Common.EatingHabit;
      content: string;
    }[];
  }
}

declare module Map {
  type EventsType =
    | "center_changed"
    | "zoom_start"
    | "zoom_changed"
    | "bounds_changed"
    | "click"
    | "dblclick"
    | "rightclick"
    | "mousemove"
    | "dragstart"
    | "drag"
    | "dragend"
    | "idle"
    | "tilesloaded"
    | "maptypeid_changed";
}
