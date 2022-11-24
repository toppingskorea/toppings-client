import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { motion } from "framer-motion";
import { flex, position, SafeArea } from "@toss/emotion-utils";
import { useState } from "react";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";

const ProfileEditEatingHabits = () => {
  const theme = useTheme();
  useSetNavigation({
    top: {
      title: (
        <Text
          _fontSize={23}
          weight={theme.weighs.bold}
          _color={theme.colors.secondary[47]}
        >
          Select a Eating Habit
        </Text>
      ),
      right: <Exit />
    },
    bottom: true
  });

  const [habits, setHabits] =
    useState<Pick<Profile.UserDTO, "habits">["habits"]>();

  return (
    <SafeArea>
      <SelectEatingHabit
        habits={habits}
        onClick={(title, content) => {
          setHabits([
            {
              title,
              content
            }
          ]);
        }}
      />

      <motion.div
        variants={defaultSlideFadeInVariants("bottom")}
        {...framerMocker}
        css={css`
          ${position("fixed", {
            bottom: theme.dimensions.bottomNavigationHeight + 34,
            left: 0,
            right: 0
          })}
          ${flex({ justify: "center" })}
        `}
      >
        <FilledButton
          size={{
            width: 278,
            height: 37
          }}
          bgColor={theme.colors.primary}
          onClick={() => console.log("식습관 수정처리")}
        >
          <Text
            _fontSize={17}
            _color={theme.colors.white}
            weight={theme.weighs.semiBold}
          >
            Save
          </Text>
        </FilledButton>
      </motion.div>
    </SafeArea>
  );
};

export default ProfileEditEatingHabits;
