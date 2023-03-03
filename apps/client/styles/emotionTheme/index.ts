import { colors } from "./colors";
import { dimensions } from "./dimensions";
import { weighs } from "./weighs";
import { zIndex } from "./zIndex";

export const emotionTheme = {
  colors,
  dimensions,
  weighs,
  zIndex
} as const;

export { colors, dimensions, weighs, zIndex };
