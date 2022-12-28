import { useRouter } from "next/router";
import { SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { SelectEatingHabit } from "~/components/Section";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useCurrentSelectCategorySetter,
  useMapSearchByCountrySetter
} from "~/recoil/atoms";
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

  const { props: keyword, setValue } = useInput({});

  return (
    <>
      <SearchLayout>
        <SearchInput
          placeholder="enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </SearchLayout>

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
