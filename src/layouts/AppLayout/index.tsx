import { css, useTheme } from "@emotion/react";
import { ScrollContainer } from "~/components/Common";

interface Props {
  children: Util.SingleOrArray<JSX.Element>;
}

const AppLayout = ({ children }: Props) => {
  const theme = useTheme();
  return (
    <ScrollContainer>
      <main
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
          background-color: ${theme.colors.black};
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
