import styled from "styled-components";
import { Colors, FlexBox, media, pxToRem } from "~/constants";

const Container = styled(FlexBox)`
  width: ${pxToRem(1080)};
  height: 100vh;
  margin: 0 auto;

  background-color: ${Colors.black};
  ${media.laptop} {
    width: 100%;
  }
`;

export default Container;
