import { css } from "@emotion/react";
import { flex } from "@toss/emotion-utils";
import { ScrollContainer } from "~/components/Common";
import BottomNavigator from "~/components/Layout/BottomNavigator";

interface Props {
  children: Util.SingleOrArray<JSX.Element>;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div
      css={css`
        max-width: 560px;
        margin: 0 auto;
      `}
    >
      <ScrollContainer>
        <main
          css={css`
            ${flex({ direction: "column" })}
          `}
        >
          {children}
        </main>
        {/* TODO: 추후 로딩 라우팅시 프로그레스 추가 필요  */}
        {/* <PageLoader /> */}
      </ScrollContainer>
      <BottomNavigator />
    </div>
  );
};
export default AppLayout;
