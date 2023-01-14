import {
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useMapBoundsValue,
  useMapSearchByCountrySetter
} from "@atoms/index";
import { useRouter } from "next/router";
import { TagFamily } from "~/components/Recent";
import { SelectEatingHabit } from "~/components/Section";
import { useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByEatingHabit,
  useUploadRecentHistory
} from "~/server/recent";
import { replaceSpace } from "~/utils";

const EatingHabitPage = () => {
  const { push } = useRouter();
  const mapBounds = useMapBoundsValue();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantByEatingHabit } =
    useFetchRestaurantByEatingHabit({
      onSuccess: data => {
        setMapSearchByCountry(data);
        setCurrentSelectCategory("Habit");

        push("/map");
      }
    });

  useSetNavigation({
    top: {
      marginBottom: 37
    }
  });

  return (
    <>
      <TagFamily />

      <SelectEatingHabit
        isRecent
        onClick={(title, content) => {
          const removeSpaceContent = replaceSpace(content);

          setCurrentSelectKeyword(removeSpaceContent);
          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: removeSpaceContent,
            category: "Habit"
          });

          fetchRestaurantByEatingHabit({
            habitTitle: title,
            habit: removeSpaceContent,
            direction: mapBounds!
          });
        }}
      />
    </>
  );
};

export default EatingHabitPage;
