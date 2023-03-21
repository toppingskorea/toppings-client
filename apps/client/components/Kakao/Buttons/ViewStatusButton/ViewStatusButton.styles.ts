import styled from "@emotion/styled";
import { hexToRgba } from "@toppings/utils";
import { flex, padding, position, touchable } from "@toss/emotion-utils";
import { motion } from "framer-motion";

export const Button = styled(motion.button)`
  ${({ theme }) =>
    position("fixed", {
      bottom: theme.dimensions.bottomNavigationHeight + 16,
      left: "50%"
    })}
  ${flex.center()}
  ${padding({
    x: 21,
    y: 8
  })}
  ${touchable}

  z-index: ${({ theme }) => theme.zIndex.two};
  transform: translateX(-50%) !important;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRgba(theme.colors.black, 0.25)};
`;
