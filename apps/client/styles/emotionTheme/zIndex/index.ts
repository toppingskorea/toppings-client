/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {zIndex} = useTheme()

 <Dummy height={zIndex.one}/>
*/
const zIndex = {
  zero: 0,
  one: 1,
  two: 2,
  ten: 10
} as const;

export default zIndex;
