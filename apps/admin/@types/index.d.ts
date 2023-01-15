declare module Common {
  type CSSPixelValue = string | number;
  type TransformOrigin = "top" | "right" | "bottom" | "left";

  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  interface PagiNationRequest {
    page: number;
  }

  interface PagiNationConfig {
    totalPage: number;
    prev: boolean;
    next: boolean;
    pageList: number[];
  }

  interface PagiNationResponse<T> extends PagiNationConfig {
    page: number;
    size: number;
    start: number;
    end: number;
    items: T[];
  }

  type PageDirection = "prev" | "next";
}
