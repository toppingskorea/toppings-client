import { useEditState } from "@atoms/edit";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { flex, position, SafeArea } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";

const ProfileEditEatingHabits = () => {
  const router = useInternalRouter();
  const theme = useTheme();
  const [edit, setEdit] = useEditState();
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

  return (
    <SafeArea>
      <SelectEatingHabit
        habits={edit.habits}
        onClick={(title, content) => {
          setEdit({
            ...edit,
            habits: [
              {
                title,
                content
              }
            ]
          });
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
          onClick={router.back}
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
