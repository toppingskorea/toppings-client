/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {weigh} = useTheme()

 <Dummy height={weigh.light}/>
*/
const weigh = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900
} as const;

export default weigh;
