import { css } from "@emotion/react";
import { flex } from "@toss/emotion-utils";
import type { PropsWithChildren } from "react";
import { PageLoader, ScrollContainer } from "~/components/Common";
import { TopNavigator } from "~/components/Layout";
import BottomNavigator from "~/components/Layout/BottomNavigator";
import { useNavigationValue } from "~/recoil/atoms";

const AppLayout = ({ children }: PropsWithChildren) => {
  const state = useNavigationValue();

  return (
    <div
      css={css`
        max-width: 560px;
        margin: 0 auto;
      `}
    >
      <ScrollContainer>
        {!!state.top && <TopNavigator />}
        <main
          css={css`
            ${flex({ direction: "column" })}
          `}
        >
          {children}
        </main>
        <PageLoader />
      </ScrollContainer>
      {!!state.bottom && <BottomNavigator />}
    </div>
  );
};
export default AppLayout;
