import { css, useTheme } from "@emotion/react";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { SearchInput } from "~/components/Common";
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
      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${colors.white};
          max-width: ${dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => console.log("sad")}
          placeholder="enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </div>

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
