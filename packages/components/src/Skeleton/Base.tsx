import styled from "@emotion/styled";

export const Base = styled.div`
  background: #e8e8e8;
  display: inline-block;
  border-radius: 4px;
  background-size: 200% 200%;
  background-position: 0 center;
  animation: skeleton--zoom-in 0.2s ease-out, skeleton--loading 1s infinite;

  @keyframes skeleton--zoom-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes skeleton--loading {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;
