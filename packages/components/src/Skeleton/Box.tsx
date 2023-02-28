import styled from "@emotion/styled";
import { size as _size } from "@toss/emotion-utils";
import { Base } from "./Base";

interface Props {
  size: Parameters<typeof _size>[0];
}

export const Box = styled(Base)<Props>`
  ${({ size }) => _size(size)}
`;
