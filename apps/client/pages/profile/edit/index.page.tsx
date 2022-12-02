import { useEditValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Flex, flex, padding, size, Stack } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { useCallback } from "react";
import { FilledButton, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { UserInfo } from "~/components/Profile/edit";
import { env } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { useUpdateUserInfo } from "~/mutations/profile";
import { Keys, useFetchUserInfo } from "~/queries/profile";

const ProfileEdit = () => {
  const router = useInternalRouter();
  const theme = useTheme();
  const overlay = useOverlay();

  useSetNavigation({
    top: {
      title: undefined,
      right: <Exit />,
      marginBottom: 24
    },
    bottom: true
  });

  const { data } = useFetchUserInfo();
  const edit = useEditValue();

  const { mutate } = useUpdateUserInfo({
    onSuccess: () => {
      overlay.open(() => <SuccessModal />);

      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    }
  });

  const onClickRegisterHandler = useCallback(() => {
    mutate({
      name: edit.name ?? data.name,
      country: edit.country ?? data.country,
      habits: edit.habits ?? data.habits,
      profile: edit.profile ?? data.profile
    });
  }, [
    data.country,
    data.habits,
    data.name,
    data.profile,
    edit.country,
    edit.habits,
    edit.name,
    edit.profile,
    mutate
  ]);

  return (
    <section
      css={css`
        ${flex({ direction: "column", align: "center" })}
        ${padding({ left: 25, right: 28 })}
      `}
    >
      <Stack.Vertical
        css={css`
          ${size({ width: 340 })}
        `}
      >
        <UserInfo />
        <Flex
          justify="center"
          css={css`
            ${padding({ bottom: 5 })}
          `}
        >
          <FilledButton
            size={{
              width: 278,
              height: 37
            }}
            bgcolor={theme.colors.primary}
            onClick={onClickRegisterHandler}
          >
            <Text
              _fontSize={17}
              _color={theme.colors.white}
              weight={theme.weighs.semiBold}
            >
              Register
            </Text>
          </FilledButton>
        </Flex>
      </Stack.Vertical>
    </section>
  );
};

export default ProfileEdit;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.user(), async () => {
    const { data } = await axios.get<{ data: Profile.UserDTO }>(
      `${env.TOPPINGS_SERVER_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );
    return data.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
