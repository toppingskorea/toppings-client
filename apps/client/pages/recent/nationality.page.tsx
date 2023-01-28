import {
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { SearchNationality } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import {
  useInput,
  useInternalRouter,
  useScrollToTopByKeywordChange,
  useSetNavigation
} from "~/hooks";
import { useUploadRecentHistory } from "~/server/recent";

const NationalityPage = () => {
  const { colors, weighs } = useTheme();
  const { push } = useInternalRouter();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();

  useSetNavigation({
    top: {
      marginBottom: 37,
      backDirectlyURL: "/recent",
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          Select a Nationality
        </Text>
      )
    }
  });

  const { props: keyword, setValue } = useInput({});

  useScrollToTopByKeywordChange(keyword.value);

  return (
    <>
      <OpenGraph title="Search Nationality" />
      <SearchLayout>
        <SearchInput
          placeholder="Search nationality"
          setValue={setValue}
          {...keyword}
        />
      </SearchLayout>
      <TagFamily isBlur />
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setCurrentSelectKeyword(name);
          setCurrentSelectCategory("Country");

          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: name,
            category: "Country"
          });

          push("/map");
        }}
      />
    </>
  );
};

export default NationalityPage;
