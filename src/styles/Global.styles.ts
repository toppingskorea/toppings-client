import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { media, ROOT_FONT_SIZE, vw, vwMobile } from "../constants";

// 외부에서 import 할거니까 모듈 내보내자~!
const GlobalStyle = createGlobalStyle`
  ${reset}

  /* 그밖에 글로벌 스타일 작성하기  */
  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }

  ul {
    list-style: none;
  }
  
  input {
    outline: none;
  }

  button {
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0; // ios default css
    border: none;

    &:disabled {
      cursor: not-allowed;
    }
  }

  svg,img {
    vertical-align: top;
  }
  
  body {
    height: 100%;
  }

  html {
    font-size: ${vw(ROOT_FONT_SIZE)};
    will-change: font-size;
    height: 100%;

    ${media.laptop} {
      font-size: ${vwMobile(ROOT_FONT_SIZE)};
    }
  }
`;

export default GlobalStyle;
