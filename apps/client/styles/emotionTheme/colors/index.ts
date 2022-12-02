/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {colors} = useTheme()

 <Dummy _color={colors.black}/>
*/
const colors = {
  white: "#FFFFFF",
  black: "#000000",
  grayE8: "#E8E8E8",
  primary: "#FF7D1F",
  secondary: {
    D9: "#D9D9D9",
    "79": "#797979",
    "73": "#737272",
    "6D": "#6D6D6D",
    F1: "#F1F1F1",
    F4: "#F4F4F4",
    "62": "#626262",
    "47": "#474747",
    "49": "#494949",
    B8: "#B8B8B8",
    "69": "#696969",
    "66": "#666666",
    "52": "#525252",
    "34": "#343434"
  },

  dim: {
    black: "rgba(0,0,0,0.3)",
    orange: "rgba(255,125,31,0.8)"
  },
  kakaoYellow: "#FEE102"
} as const;

export default colors;
