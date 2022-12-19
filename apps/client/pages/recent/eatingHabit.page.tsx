import { useTheme } from "@emotion/react";
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
import { useMapSearchByCountrySetter, useRegisterState } from "~/recoil/atoms";

const RecentPage = () => {
  const { colors, dimensions } = useTheme();
  const { push } = useRouter();
  const [register, setRegister] = useRegisterState();
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
      marginBottom: 85
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <SearchLayout>
        <SearchInput
          onSubmit={() => console.log("sad")}
          placeholder="enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </SearchLayout>

      <TagFamily />

      <SelectEatingHabit
        isRecent
        onClick={(title, content) => {
          setRegister({
            ...register,
            habit: [
              {
                title,
                content
              }
            ]
          });
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
        habits={register.habit}
      />
    </SafeArea>
  );
};

export default RecentPage;
