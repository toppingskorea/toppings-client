import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useSearchByFilteringSetter
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text } from "~/components/Common/Typo";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByName,
  useUploadRecentHistory
} from "~/server/recent";
import { isLoggedIn } from "~/utils";

const useFilterRestaurant = () => {
  const { colors, weighs } = useTheme();
  const [restaurantList, setRestaurantList] =
    useState<Restaurant.SearchByFilteringDTO[]>();

  useSetNavigation({
    top: {
      marginBottom: 37,
      backDirectlyURL: isLoggedIn() ? "/recent" : "/map",
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          {restaurantList?.length ?? "0"} Restaurants
        </Text>
      )
    }
  });

  const { push } = useRouter();

  const setCurrentLocation = useCurrentLocationSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const mapSearchByFiltering = useSearchByFilteringSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantByNameMutate } = useFetchRestaurantByName({
    onSuccess: data => {
      setRestaurantList(data);
    }
  });

  const {
    props: keyword,
    debouncedValue,
    setValue
  } = useInput({
    useDebounce: true,
    debounceTimeout: 300
  });

  useEffect(() => {
    if (!debouncedValue.length) {
      setRestaurantList(undefined);
      return;
    }

    fetchRestaurantByNameMutate(debouncedValue);
  }, [debouncedValue, fetchRestaurantByNameMutate]);

  const restaurantCardClickHandler = (
    item: Restaurant.SearchByFilteringDTO
  ) => {
    uploadRecentHistoryMutate({
      type: "Filter",
      keyword: item.name,
      category: "Name",
      content: item.address,
      restaurantId: item.id
    });

    setCurrentLocation({
      latitude: item.latitude,
      longitude: item.longitude
    });

    mapSearchByFiltering([item]);
    setCurrentSelectKeyword(item.name);
    setCurrentSelectCategory("Name");

    push("/map");
  };

  return {
    keyword,
    setValue,
    restaurantList,
    fetchRestaurantByNameMutate,
    restaurantCardClickHandler
  };
};

export default useFilterRestaurant;
