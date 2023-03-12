import { useTheme } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import { useCallback } from "react";
import { SuccessModal, Text } from "~/components/Common";
import {
  useInternalRouter,
  useSetNavigation as useSetNavigationHook
} from "~/hooks";
import { useRegister } from "~/server/register";
import { useRegisterInfoStore } from "~/stores/register";

export const useSetNavigation = () => {
  const { colors, weighs } = useTheme();

  const { onSubmitRegister } = useSubmitRegister();

  useSetNavigationHook({
    top: {
      marginBottom: 35,
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          Select a Eating Habit
        </Text>
      ),
      right: {
        element: (
          <Text _fontSize={15} _color={colors.secondary[93]}>
            Skip
          </Text>
        ),
        onClick: onSubmitRegister
      }
    }
  });
};

export const useSubmitRegister = () => {
  const { push } = useInternalRouter();
  const { habits, country } = useRegisterInfoStore(state => ({
    habits: state.habits,
    country: state.country
  }));
  const overlay = useOverlay();

  const openSuccessModal = () => {
    overlay.open(() => <SuccessModal />);
  };

  const { mutate: registerMutate } = useRegister({
    onSuccess: () => {
      openSuccessModal();
      setTimeout(() => {
        push("/");
      }, 3000);
    }
  });

  const onSubmitRegister = useCallback(() => {
    registerMutate({
      country,
      habits
    });
  }, [registerMutate, country, habits]);

  return {
    onSubmitRegister
  };
};

export const useTagClick = () => {
  const { habits, dispatchHabits } = useRegisterInfoStore(state => ({
    habits: state.habits,
    dispatchHabits: state.dispatchHabits
  }));

  const onTagClickHandler = useCallback(
    (title: Common.EatingHabit, content: string) => {
      if (habits.length > 0 && habits[0].content === content) {
        dispatchHabits([]);
        return;
      }
      dispatchHabits([
        {
          title,
          content
        }
      ]);
    },
    [dispatchHabits, habits]
  );

  return {
    onTagClickHandler
  };
};

export const useRegisterInfoState = () => {
  const { habits } = useRegisterInfoStore(state => ({
    habits: state.habits
  }));

  return {
    habits
  };
};
