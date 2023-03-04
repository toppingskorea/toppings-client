import { useEditReset, useProfileEatingHabitChangedReset } from "@atoms/edit";
import { useTheme } from "@emotion/react";
import { Text } from "~/components/Common";
import { useSetNavigation as useSetNavigationHook } from "~/hooks";

export const useSetNavigation = () => {
  const { colors, weighs } = useTheme();
  const { clickBackButtonHandler } = useClickBackButton();
  useSetNavigationHook({
    top: {
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          Edit Profile
        </Text>
      ),
      marginBottom: 24,
      backButtonCaution: true,
      backButtonClickHandler: clickBackButtonHandler
    },
    bottom: true
  });
};

const useClickBackButton = () => {
  const { resetProfileEditPageState } = useResetProfileEditPageState();

  return {
    clickBackButtonHandler: resetProfileEditPageState
  };
};

export const useResetProfileEditPageState = () => {
  const resetEdit = useEditReset();
  const resetProfileEatingHabitChanged = useProfileEatingHabitChangedReset();

  const handler = () => {
    resetEdit();
    resetProfileEatingHabitChanged();
  };

  return {
    resetProfileEditPageState: handler
  };
};
