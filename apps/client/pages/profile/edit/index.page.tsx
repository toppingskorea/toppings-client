import { useEditValue, useProfileEatingHabitChangedValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Flex, flex, padding, size, Spacing, Stack } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { useCallback, useMemo } from "react";
import { FilledButton, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { UserInfo } from "~/components/Profile/edit";
import { env } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { Keys, useFetchUserInfo, useUpdateUserInfo } from "~/server/profile";
import { replaceSpace } from "~/utils";

const ProfileEdit = () => {
  const { push } = useInternalRouter();
  const { colors, weighs } = useTheme();
  const overlay = useOverlay();

  useSetNavigation({
    top: {
      title: undefined,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      },
      marginBottom: 24
    },
    bottom: true
  });

  const { data: userInfo } = useFetchUserInfo();
  const edit = useEditValue();

  const { mutate: updateUserInfoMutate } = useUpdateUserInfo({
    onSuccess: () => {
      overlay.open(() => <SuccessModal />);

      setTimeout(() => {
        push("/profile");
      }, 2000);
    }
  });

  const isProfileEatingHabitChanged = useProfileEatingHabitChangedValue();

  const newHabits = useMemo(() => {
    if (isProfileEatingHabitChanged) {
      if (edit.habits?.length === 0) return [];

      if (edit.habits)
        return [
          {
            title: edit.habits[0].title,
            content: replaceSpace<string>(edit.habits[0].content)
          }
        ];
    }
    return userInfo.habits;
  }, [isProfileEatingHabitChanged, userInfo.habits, edit.habits]);

  const onClickRegisterHandler = useCallback(() => {
    updateUserInfoMutate({
      name: edit.name ?? userInfo.name,
      country: edit.country ?? userInfo.country,
      habits: newHabits,
      profile: edit.profile ?? userInfo.profile
    });
  }, [
    updateUserInfoMutate,
    edit.name,
    edit.country,
    edit.profile,
    userInfo.name,
    userInfo.country,
    userInfo.profile,
    newHabits
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
        <Spacing size={24} />
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
            bgcolor={colors.primary}
            onClick={onClickRegisterHandler}
          >
            <Text _fontSize={17} _color={colors.white} weight={weighs.semiBold}>
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
      `${env.TOPPINGS_SERVER_URL}/api/v1/user`,
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
