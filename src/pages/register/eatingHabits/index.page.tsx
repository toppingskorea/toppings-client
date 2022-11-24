import { css, useTheme } from "@emotion/react";
import { Flex, gutter, position, SafeArea, size } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useCallback } from "react";
import { check } from "~/assets/json";
import { Badge } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { useRegister } from "~/mutations/register";
import { useRegisterState } from "~/recoil/atoms";

const EatingHabits = () => {
  const router = useInternalRouter();
  const theme = useTheme();
  const [register, setRegister] = useRegisterState();
  const overlay = useOverlay();

  const { mutate } = useRegister({
    onSuccess: () => {
      openSuccessModal();
      setTimeout(() => {
        router.push("/map");
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
        <Text
          _fontSize={23}
          weight={theme.weighs.bold}
          _color={theme.colors.secondary[47]}
        >
          Select a Eating Habit
        </Text>
      ),
      right: (
        <Text
          _fontSize={15}
          _color={theme.colors.secondary[69]}
          onClick={onSubmitRegister}
        >
          Skip
        </Text>
      )
    }
  });

  const openSuccessModal = () => {
    overlay.open(() => (
      <Flex.Center
        direction="column"
        css={css`
          ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
          ${size.full}
          ${gutter({ direction: "vertical", space: 30 })}
          background-color: ${theme.colors.white};
        `}
      >
        <Lottie
          loop
          autoplay
          animationData={check}
          css={css`
            ${size({ width: 42, height: 42 })}
          `}
        />

        <Text
          _fontSize={23}
          weight={theme.weighs.heavy}
          _color={theme.colors.secondary[47]}
        >
          Complete!
        </Text>
      </Flex.Center>
    ));
  };

  return (
    <SafeArea>
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
    </SafeArea>
  );
};

export default EatingHabits;
