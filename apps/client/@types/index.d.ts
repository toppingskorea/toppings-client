declare module Common {
  type CSSPixelValue = string | number;
  type TransformOrigin = "top" | "right" | "bottom" | "left";
  type EatingHabit = "Diet" | "Religion";

  interface PercentDTO {
    count: number;
    percent: number;
  }

  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  interface PaginationRequest {
    page: number;
  }

  interface PaginationConfig {
    totalPage: number;
    prev: boolean;
    next: boolean;
    pageList: number[];
  }

  interface PaginationResponse<T> extends PaginationConfig {
    page: number;
    size: number;
    start: number;
    end: number;
    items: T[];
  }

  type PageDirection = "prev" | "next";
}
