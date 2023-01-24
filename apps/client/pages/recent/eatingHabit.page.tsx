import {
  useCurrentHabitTitleSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter
} from "@atoms/index";
import { useRouter } from "next/router";
import { TagFamily } from "~/components/Recent";
import { SelectEatingHabit } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import type { diets } from "~/constants/data/common";
import { useSetNavigation } from "~/hooks";
import { useUploadRecentHistory } from "~/server/recent";
import { replaceSpace } from "~/utils";

const EatingHabitPage = () => {
  useSetNavigation({
    top: {
      marginBottom: 37
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
      <TagFamily />

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
