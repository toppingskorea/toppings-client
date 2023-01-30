import { useEditValue, useProfileEatingHabitChangedValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Flex, padding } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { useCallback, useMemo } from "react";
import { FilledButton, Seek, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useInternalRouter } from "~/hooks";
import { useFetchUserInfo, useUpdateUserInfo } from "~/server/profile";
import { replaceSpace } from "~/utils";

const RegisterButton = () => {
  const { colors, weighs } = useTheme();
  const { push } = useInternalRouter();

  const { data: userInfo } = useFetchUserInfo();
  const edit = useEditValue();
  const overlay = useOverlay();

  const { mutate: updateUserInfoMutate, isLoading: updateUserInfoIsLoading } =
    useUpdateUserInfo({
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
            content: replaceSpace(edit.habits[0].content)
          }
        ];
    }

    if (userInfo?.habits)
      return [
        {
          title: userInfo.habits[0].title,
          content: replaceSpace(userInfo.habits[0].content)
        }
      ];

    return undefined;
  }, [isProfileEatingHabitChanged, userInfo?.habits, edit.habits]);

  const onClickRegisterHandler = useCallback(() => {
    if (!userInfo) return;

    updateUserInfoMutate({
      name: edit.name ?? userInfo.name,
      country: edit.country ?? userInfo.country,
      habits: newHabits,
      profile: edit.profile ?? userInfo.profile
    });
  }, [
    userInfo,
    updateUserInfoMutate,
    edit.name,
    edit.country,
    edit.profile,
    newHabits
  ]);
  return (
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
        disabled={updateUserInfoIsLoading}
        onClick={onClickRegisterHandler}
      >
        {updateUserInfoIsLoading ? (
          <Seek />
        ) : (
          <Text _fontSize={17} _color={colors.white} weight={weighs.semiBold}>
            Register
          </Text>
        )}
      </FilledButton>
    </Flex>
  );
};

export default RegisterButton;
