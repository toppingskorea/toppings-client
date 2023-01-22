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

  interface Direction {
    qa: number;
    oa: number;
    pa: number;
    ha: number;
  }

  type KakaoBounds = kakao.maps.LatLngBounds & Map.Direction;
}
