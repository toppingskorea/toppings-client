import { useEditState, useProfileEatingHabitChangedSetter } from "@atoms/edit";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";

const ProfileEditEatingHabits = () => {
  const { push, back } = useInternalRouter();
  const { colors, weighs, dimensions } = useTheme();
  const [edit, setEdit] = useEditState();
  const setProfileEatingHabitChanged = useProfileEatingHabitChangedSetter();
  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          Select a Eating Habit
        </Text>
      ),
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    },
    bottom: true
  });

  const onTagClickHandler = useCallback(
    (title: Common.EatingHabit, content: string) => {
      setProfileEatingHabitChanged(true);

      if (
        edit.habits &&
        edit.habits.length > 0 &&
        edit.habits[0].content === content
      ) {
        setEdit({
          ...edit,
          habits: []
        });

        return;
      }

      setEdit({
        ...edit,
        habits: [
          {
            title,
            content
          }
        ]
      });
    },
    [edit, setEdit, setProfileEatingHabitChanged]
  );

  return (
    <>
      <OpenGraph title="Edit Eating Habits" />

      <SelectEatingHabit habits={edit.habits} onClick={onTagClickHandler} />

      <motion.div
        variants={defaultSlideFadeInVariants("bottom")}
        {...framerMocker}
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight + 34,
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
          bgcolor={colors.primary}
          onClick={back}
        >
          <Text _fontSize={17} _color={colors.white}>
            Save
          </Text>
        </FilledButton>
      </motion.div>
    </>
  );
};

export default ProfileEditEatingHabits;
