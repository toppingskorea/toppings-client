/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {zIndexs} = useTheme()

 <Dummy height={zIndexs.one}/>
*/
const zIndexs = {
  one: 1,
  ten: 10
} as const;

export default zIndexs;
