import styled from "@emotion/styled";
import { flex } from "@toss/emotion-utils";

interface Props {
  color?: string;
  size?: number;
}

const Seek = ({ color = "white", size = 9 }: Props) => {
  return (
    <Container className="seek-bounding-box" color={color} size={size}>
      <span className="seek-loader">
        <span className="seek-bounce seek-bounce1" />
        <span className="seek-bounce seek-bounce2" />
        <span className="seek-bounce seek-bounce3" />
      </span>
    </Container>
  );
};

export default Seek;

const Container = styled.span<{ size: number; color: string }>`
  font-size: ${({ size }) => `${size}px`};
  display: inline-block;
  box-sizing: border-box;

  .seek-loader {
    width: 5em;
    height: 1.5em;
    text-align: center;
    color: ${({ color }) => color};
    position: relative;
    z-index: 0;

    ${flex({
      justify: "center",
      align: "center"
    })}

    .seek-bounce {
      width: 1.12em;
      height: 1.12em;
      background-color: currentColor;

      border-radius: 100%;
      display: inline-block;
      animation: seek-blinken 1.4s infinite ease-in-out both;
    }

    .seek-bounce1 {
      animation-delay: -0.32s;
    }

    .seek-bounce2 {
      animation-delay: -0.16s;
    }
  }

  @keyframes seek-blinken {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;
