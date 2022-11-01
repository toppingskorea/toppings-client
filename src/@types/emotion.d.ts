import "@emotion/react";
import { EmotionTheme } from "~/styles/emotionTheme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends EmotionTheme {}
}
