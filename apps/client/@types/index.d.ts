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
}
