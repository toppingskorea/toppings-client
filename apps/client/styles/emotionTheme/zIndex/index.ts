/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {zIndex} = useTheme()

 <Dummy height={zIndex.one}/>
*/
const zIndex = {
  one: 1
} as const;

export default zIndex;
