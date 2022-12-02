import { useNavigationValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { flex, height100, Spacing } from "@toss/emotion-utils";
import { PageLoader, ScrollContainer } from "~/components/Common";
import { TopNavigator } from "~/components/Layout";
import BottomNavigator from "~/components/Layout/BottomNavigator";

const AppLayout = ({ children }: Util.PropsWithChild) => {
  const state = useNavigationValue();
  const { dimensions } = useTheme();

  return (
    <div
      css={css`
        max-width: 560px;
        margin: 0 auto;
        height: 100vh;
      `}
    >
      <ScrollContainer>
        {!!state.top && <TopNavigator />}
        <main
          css={css`
            ${flex({ direction: "column" })}
            ${height100}
          `}
        >
          {children}
          {state.bottom && <Spacing size={dimensions.bottomNavigationHeight} />}
        </main>
        <PageLoader />
      </ScrollContainer>
      {!!state.bottom && <BottomNavigator />}
    </div>
  );
};
export default AppLayout;
