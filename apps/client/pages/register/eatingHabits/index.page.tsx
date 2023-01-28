import { css, useTheme } from "@emotion/react";
import { position } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { motion } from "framer-motion";

import { useCallback } from "react";

import { useRegisterState } from "@atoms/index";
import { Badge, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { useRegister } from "~/server/register";
import { OpenGraph } from "~/components/Util";

const EatingHabits = () => {
  const { push } = useInternalRouter();
  const { colors, weighs } = useTheme();
  const [register, setRegister] = useRegisterState();
  const overlay = useOverlay();

  const { mutate: registerMutate } = useRegister({
    onSuccess: () => {
      openSuccessModal();
      setTimeout(() => {
        push("/map");
      }, 3000);
    }
  });

  const onSubmitRegister = useCallback(() => {
    registerMutate({
      ...register
    });
  }, [registerMutate, register]);

  useSetNavigation({
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

  const openSuccessModal = () => {
    overlay.open(() => <SuccessModal />);
  };

  const onTagClickHandler = useCallback(
    (title: Common.EatingHabit, content: string) => {
      if (
        register.habits.length > 0 &&
        register.habits[0].content === content
      ) {
        setRegister({
          ...register,
          habits: []
        });
        return;
      }
      setRegister({
        ...register,
        habits: [
          {
            title,
            content
          }
        ]
      });
    },
    [register, setRegister]
  );

  return (
    <>
      <OpenGraph title="Register Eating Habits" />
      <SelectEatingHabit onClick={onTagClickHandler} habits={register.habits} />

      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { bottom: 44, right: 0 })}
        `}
        onClick={onSubmitRegister}
      >
        <Badge attach="right">Next</Badge>
      </motion.div>
    </>
  );
};

export default EatingHabits;
