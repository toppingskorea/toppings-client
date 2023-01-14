import {
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useMapBoundsValue,
  useMapSearchByCountrySetter
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
import {
  useFetchRestaurantByCountry,
  useUploadRecentHistory
} from "~/server/recent";

const NationalityPage = () => {
  const { push } = useInternalRouter();
  const mapBounds = useMapBoundsValue();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: data => {
        setMapSearchByCountry(data);
        setCurrentSelectCategory("Country");
        push("/map");
      }
    });

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
          placeholder="Enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </SearchLayout>
      <TagFamily isBlur />
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setCurrentSelectKeyword(name);
          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: name,
            category: "Country"
          });
          fetchRestaurantByCountryMutate({
            country: name,
            direction: mapBounds!
          });
          fetchRestaurantByCountryMutate({
            country: name,
            direction: mapBounds!
          });
        }}
      />
    </>
  );
};

export default NationalityPage;
