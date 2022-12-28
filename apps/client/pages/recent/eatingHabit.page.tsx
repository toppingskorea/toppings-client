import {
  useCurrentSelectCategorySetter,
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

const RecentPage = () => {
  const { push } = useRouter();
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
          setCurrentSelectCategory(content);
          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: content,
            category: "Habit"
          });
          fetchEatingHabitByFilteringMutate({
            habitTitle: title,
            habit: content
          });
        }}
      />
    </>
  );
};

export default RecentPage;
