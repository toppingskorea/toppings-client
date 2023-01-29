import {
  useCurrentHabitTitleSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { TagFamily } from "~/components/Recent";
import { SelectEatingHabit } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import type { diets } from "~/constants/data/common";
import { useSetNavigation } from "~/hooks";
import { useUploadRecentHistory } from "~/server/recent";
import { replaceSpace } from "~/utils";

const EatingHabitPage = () => {
  const { colors, weighs } = useTheme();
  useSetNavigation({
    top: {
      marginBottom: 37,
      backDirectlyURL: "/recent",
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          Select a Eating Habit
        </Text>
      )
    }
  });

  const { push } = useRouter();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setCurrentHabitTitle = useCurrentHabitTitleSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();

  return (
    <>
      <OpenGraph title="Search Eating Habits" />
      <TagFamily isBlur />

      <SelectEatingHabit
        isRecent
        onClick={(title, content) => {
          const removeSpaceContent =
            replaceSpace<Util.ElementType<typeof diets>>(content);

          setCurrentHabitTitle(title);
          setCurrentSelectKeyword(removeSpaceContent);
          setCurrentSelectCategory("Habit");

          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: removeSpaceContent,
            category: "Habit"
          });

          push("/map");
        }}
      />
    </>
  );
};

export default EatingHabitPage;
