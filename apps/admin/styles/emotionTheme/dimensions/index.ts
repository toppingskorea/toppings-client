/*
 사용하는 부분에선 다음과 같이 사용해주세요.
 import { useTheme } from "@emotion/react"
 const {dimensions} = useTheme()

 <Dummy height={dimensions.bottomNavigationHeight}/>
*/
const dimensions = {
  sidebarWidth: 500
} as const;

export default dimensions;
