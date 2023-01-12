import colors from "./colors";
import dimensions from "./dimensions";
import weighs from "./weighs";
import zIndex from "./zIndex";

const emotionTheme = {
  colors,
  dimensions,
  weighs,
  zIndex
} as const;

export default emotionTheme;
