import colors from "./colors";
import dimensions from "./dimensions";
import weighs from "./weighs";
import zIndexs from "./zIndexs";

const emotionTheme = {
  colors,
  dimensions,
  weighs,
  zIndexs
} as const;

export default emotionTheme;
