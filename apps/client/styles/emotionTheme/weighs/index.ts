/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {weighs} = useTheme()

 <Dummy height={weighs.light}/>
*/
const weighs = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900
} as const;

export default weighs;
