import colors from "./colors";
import dimensions from "./dimensions";
import weighs from "./weighs";

const emotionTheme = {
  colors,
  dimensions,
  weighs
} as const;

export default emotionTheme;
