import { css, useTheme } from "@emotion/react";
import { ScrollContainer } from "~/components/Common";

const AppLayout = ({ children }: Util.PropsWithChild) => {
  const theme = useTheme();
  return (
    <ScrollContainer>
      <main
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
          background-color: ${theme.colors.white};
        `}
      >
        {children}
      </main>
      {/* TODO: 추후 로딩 라우팅시 프로그레스 추가 필요  */}
      {/* <PageLoader /> */}
    </ScrollContainer>
  );
};
export default AppLayout;
