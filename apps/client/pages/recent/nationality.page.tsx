import {
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter
} from "@atoms/index";
import { SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { SearchNationality } from "~/components/Section";
import {
  useInput,
  useInternalRouter,
  useScrollToTopByKeywordChange,
  useSetNavigation
} from "~/hooks";
import { useUploadRecentHistory } from "~/server/recent";

const NationalityPage = () => {
  const { push } = useInternalRouter();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();

  useSetNavigation({
    top: {
      marginBottom: 37
    }
  });

  const { props: keyword, setValue } = useInput({});

  useScrollToTopByKeywordChange(keyword.value);

  return (
    <>
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
