import { Exit } from "@svgs/common";
import { SafeArea } from "@toss/emotion-utils";
import { useEffect } from "react";
import { SearchInput, useScrollContainer } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { SearchNationality } from "~/components/Section";
import { useInput, useInternalRouter, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByCountry,
  useUploadRecentHistory
} from "~/mutations/recent";
import {
  useCurrentSelectCategorySetter,
  useMapSearchByCountrySetter
} from "~/recoil/atoms";

const RecentPage = () => {
  const { push } = useInternalRouter();
  const { scrollToTop } = useScrollContainer();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: data => {
        setMapSearchByCountry(data);
        push("/map");
      }
    });

  useSetNavigation({
    top: {
      marginBottom: 37,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    }
  });

  const { props: keyword, setValue } = useInput({});

  useEffect(() => {
    if (keyword.value) {
      scrollToTop();
    }
  }, [keyword.value, scrollToTop]);

  return (
    <SafeArea>
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
          setCurrentSelectCategory(name);
          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: name,
            category: "Country"
          });
          fetchRestaurantByCountryMutate(name);
        }}
      />
    </SafeArea>
  );
};

export default RecentPage;
