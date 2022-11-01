/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const theme = useTheme()

 <Dummy _color={theme.colors.black}/>
*/
const colors = {
  white: "#ffffff",
  black: "#000000",

  kakaoYellow: "#fee102"
} as const;

export default colors;
