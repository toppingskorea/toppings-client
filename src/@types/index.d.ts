declare module Common {
  type CSSPixelValue = string | number;
  type TransformOrigin = "top" | "right" | "bottom" | "left";
  // eslint-disable-next-line @typescript-eslint/ban-types
  type NotNullishValue = {};
}

declare module Util {
  type SingleOrArray<T> = T | T[];
  type PropsWithChild<P = unknown> = P & { children: JSX.Element };
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
