import styled from "@emotion/styled";
import {
  type CSSPixelValue,
  flex,
  padding,
  position
} from "@toss/emotion-utils";
import { motion } from "framer-motion";

export const Header = styled.header`
  ${position("sticky", { top: 0 })};
  z-index: ${({ theme }) => theme.zIndex.one};
`;

export const Nav = styled.nav<{ paddingBottom?: CSSPixelValue }>`
  ${flex({ direction: "column" })};

  ${({ paddingBottom = 24 }) =>
    padding({
      x: 28,
      top: 31,
      bottom: paddingBottom
    })};

  background-color: white;
`;

export const Title = styled(motion.div)`
  width: fit-content;
  margin: -10px auto 0;
  ${flex({
    justify: "center",
    align: "center"
  })};
`;
