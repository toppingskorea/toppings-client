/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const theme = useTheme()

 <Dummy _color={theme.colors.black}/>
*/
const colors = {
  white: "#FFFFFF",
  black: "#000000",

  kakaoYellow: "#FEE102"
} as const;

export default colors;
