import { useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { SafeArea } from "@toss/emotion-utils";
import { useState } from "react";
import { Text } from "~/components/Common/Typo";
import { SelectEatingHabit } from "~/components/Section";
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
    </SafeArea>
  );
};

export default ProfileEditEatingHabits;
