import colors from "./colors";
import dimensions from "./dimensions";
import weigh from "./weigh";
import zIndex from "./zIndex";

const emotionTheme = {
  colors,
  dimensions,
  weigh,
  zIndex
} as const;

export default emotionTheme;
