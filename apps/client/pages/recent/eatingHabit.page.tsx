import { SafeArea } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { SelectEatingHabit } from "~/components/Section";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchEatingHabitByFiltering,
  useUploadRecentHistory
} from "~/mutations/recent";
import {
  useCurrentSelectCategorySetter,
  useMapSearchByCountrySetter
} from "~/recoil/atoms";

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
    <SafeArea>
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
    </SafeArea>
  );
};

export default RecentPage;
