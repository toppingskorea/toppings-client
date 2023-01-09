import {
  useCurrentSelectCategorySetter,
  useMapBoundsValue,
  useMapSearchByCountrySetter
} from "@atoms/index";
import { useRouter } from "next/router";
import { TagFamily } from "~/components/Recent";
import { SelectEatingHabit } from "~/components/Section";
import { useSetNavigation } from "~/hooks";
import {
  useFetchEatingHabitByFiltering,
  useUploadRecentHistory
} from "~/server/recent";
import { replaceSpace } from "~/utils";

const RecentPage = () => {
  const { push } = useRouter();
  const mapBounds = useMapBoundsValue();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchEatingHabitByFilteringMutate } =
    useFetchEatingHabitByFiltering({
      onSuccess: data => {
        setMapSearchByCountry(data);

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

          setCurrentSelectCategory(removeSpaceContent);
          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: removeSpaceContent,
            category: "Habit"
          });

          fetchEatingHabitByFilteringMutate({
            habitTitle: title,
            habit: removeSpaceContent,
            direction: mapBounds!
          });
        }}
      />
    </>
  );
};

export default RecentPage;
