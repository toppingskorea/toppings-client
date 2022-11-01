import colors from "./colors";

const emotionTheme = {
  colors
} as const;

export default emotionTheme;

export type EmotionTheme = typeof emotionTheme;
