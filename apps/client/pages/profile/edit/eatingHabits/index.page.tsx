import { useEditState } from "@atoms/edit";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";

const ProfileEditEatingHabits = () => {
  const { push, back } = useInternalRouter();
  const { colors, weighs, dimensions } = useTheme();
  const [edit, setEdit] = useEditState();
  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={23} weight={weighs.bold} _color={colors.secondary[47]}>
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

  return (
    <>
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
          <Text _fontSize={17} _color={colors.white} weight={weighs.semiBold}>
            Save
          </Text>
        </FilledButton>
      </motion.div>
    </>
  );
};

export default ProfileEditEatingHabits;
