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

const EatingHabits = () => {
  const { push } = useInternalRouter();
  const { colors, weighs } = useTheme();
  const [register, setRegister] = useRegisterState();
  const overlay = useOverlay();

  const { mutate } = useRegister({
    onSuccess: () => {
      openSuccessModal();
      setTimeout(() => {
        push("/map");
      }, 3000);
    }
  });

  const onSubmitRegister = useCallback(() => {
    mutate({
      ...register
    });
  }, [mutate, register]);

  useSetNavigation({
    top: {
      marginBottom: 35,
      title: (
        <Text _fontSize={23} weight={weighs.bold} _color={colors.secondary[47]}>
          Select a Eating Habit
        </Text>
      ),
      right: {
        element: (
          <Text _fontSize={15} _color={colors.secondary[69]}>
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

  return (
    <>
      <SelectEatingHabit
        onClick={(title, content) => {
          setRegister({
            ...register,
            habit: [
              {
                title,
                content
              }
            ]
          });
        }}
        habits={register.habit}
      />

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
