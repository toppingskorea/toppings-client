import { useNavigationValue } from "@atoms/index";
import { css } from "@emotion/react";
import { flex, height100, Stack } from "@toss/emotion-utils";
import { PageLoader, ScrollContainer } from "~/components/Common";
import { TopNavigator } from "~/components/Layout";
import BottomNavigator from "~/components/Layout/BottomNavigator";

export const AppLayout = ({ children }: Util.PropsWithChild) => {
  const state = useNavigationValue();

  // const setNoticeActivate = useNoticeActivateSetter();
  // const { data: profile } = useFetchUserInfo();

  // useWebSocket(
  //   {
  //     destination: `/sub/${profile?.id}`,
  //     callback: () => {
  //       setNoticeActivate(true);
  //     }
  //   },
  //   true
  // );

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
