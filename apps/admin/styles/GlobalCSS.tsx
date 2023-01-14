import { css, Global } from "@emotion/react";

const GlobalCSS = () => {
  return (
    <Global
      styles={css`
        /* 앱처럼 user-select 제거 */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* iOS 15이하 대응 */
        input,
        textarea {
          user-select: auto;
        }

        ul {
          list-style: none;
        }

        input {
          outline: none;
          border: none;
        }

        button {
          background-color: transparent;
          cursor: pointer;
          border: none;

          &:disabled,
          &[data-disabled="disabled"] {
            cursor: not-allowed;
          }
        }

        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }

        *:focus {
          -webkit-tap-highlight-color: transparent;
          outline: none;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
        }

        input,
        textarea,
        button,
        select,
        div,
        a {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        textarea {
          resize: none;
        }
      `}
    />
  );
};

export default GlobalCSS;
