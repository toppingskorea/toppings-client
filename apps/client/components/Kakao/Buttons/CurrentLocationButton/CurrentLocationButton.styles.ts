import styled from "@emotion/styled";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";

export const Button = styled(motion.button)`
  ${flex.center()}
  ${position("absolute", {
    bottom: 16,
    left: 17
  })}

  z-index: ${({ theme }) => theme.zIndex.two};

  padding: 8px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary};
`;
