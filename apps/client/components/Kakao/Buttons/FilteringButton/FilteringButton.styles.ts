import styled from "@emotion/styled";
import { flex, Flex, padding, position, touchable } from "@toss/emotion-utils";
import { motion } from "framer-motion";

export const Container = styled(Flex.CenterVertical)`
  ${position("absolute", {
    top: 52,
    right: 17
  })}

  gap: 8px;

  z-index: ${({ theme }) => theme.zIndex.two};
`;

export const KeywordBox = styled(Flex.Center)`
  ${padding({
    x: 12,
    y: 7
  })}
  ${touchable}

  gap: 17px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.dim.orange};
`;

export const Button = styled(motion.button)`
  ${flex.center()}
  z-index: ${({ theme }) => theme.zIndex.two};

  padding: 8px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary};
`;
