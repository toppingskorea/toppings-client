import { useEditValue, useProfileEatingHabitChangedValue } from "@atoms/edit";
import { useOverlay } from "@toss/use-overlay";
import { useCallback, useMemo } from "react";
import { AlertModal, SuccessModal } from "~/components/Common";
import { useInternalRouter } from "~/hooks";
import { useFetchUserInfo, useUpdateUserInfo } from "~/server/profile";
import { replaceSpace } from "~/utils";

// eslint-disable-next-line import/prefer-default-export
export const useRegisterButtonClick = () => {
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

    const name = edit.name ?? userInfo.name;

    if (!isValidateName(name)) {
      overlay.open(({ exit }) => (
        <AlertModal exitFn={exit} information="Invalid username" />
      ));
      return;
    }

    updateUserInfoMutate({
      name,
      country: edit.country ?? userInfo.country,
      habits: newHabits ?? [],
      profile: edit.profile ?? userInfo.profile
    });
  }, [
    userInfo,
    edit.name,
    edit.country,
    edit.profile,
    updateUserInfoMutate,
    newHabits,
    overlay
  ]);

  return {
    onClickRegisterHandler,
    updateUserInfoIsLoading
  };
};

const isValidateName = (name: string) =>
  /^[A-Za-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{6,20}$/.test(name);
