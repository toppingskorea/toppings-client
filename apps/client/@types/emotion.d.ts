import "@emotion/react";
import type emotionTheme from "~/styles/emotionTheme";

declare module "@emotion/react" {
  type EmotionTheme = typeof emotionTheme;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends EmotionTheme {}
}
