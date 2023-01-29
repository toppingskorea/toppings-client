import { useNavigationValue } from "@atoms/index";
import { css } from "@emotion/react";
import { flex, height100, Stack } from "@toss/emotion-utils";
import { PageLoader, ScrollContainer } from "~/components/Common";
import { TopNavigator } from "~/components/Layout";
import BottomNavigator from "~/components/Layout/BottomNavigator";

const AppLayout = ({ children }: Util.PropsWithChild) => {
  const state = useNavigationValue();

  return (
    <Stack.Vertical
      gutter={0}
      css={css`
        ${height100}
        max-width: 560px;
        margin: 0 auto;
      `}
    >
      <ScrollContainer>
        {!!state.top && <TopNavigator />}
        <main
          css={css`
            ${flex({ direction: "column" })}
            flex: 1;
            ${height100}
          `}
        >
          {children}
        </main>
        <PageLoader />
      </ScrollContainer>
      {!!state.bottom && <BottomNavigator />}
    </Stack.Vertical>
  );
};
export default AppLayout;
