import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useMapSearchByFilteringReset,
  useSearchRestaurantIdSetter
} from "@atoms/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByName,
  useUploadRecentHistory
} from "~/server/recent";

const useRestaurant = () => {
  const { push } = useRouter();
  const [restaurantList, setRestaurantList] =
    useState<Restaurant.SearchByFilteringDTO[]>();
  const setCurrentLocation = useCurrentLocationSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const resetMapSearchByCountry = useMapSearchByFilteringReset();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setSearchRestaurantId = useSearchRestaurantIdSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantByNameMutate } = useFetchRestaurantByName({
    onSuccess: data => {
      setCurrentSelectCategory("Name");
      setRestaurantList(data);
    }
  });

  useSetNavigation({
    top: {
      marginBottom: 37
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
    setCurrentLocation({
      latitude: item.latitude,
      longitude: item.longitude
    });
    uploadRecentHistoryMutate({
      type: "Filter",
      keyword: item.name,
      category: "Name",
      content: item.address,
      restaurantId: item.id
    });
    setCurrentSelectKeyword(item.name);
    setSearchRestaurantId(item.id);
    resetMapSearchByCountry();

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

export default useRestaurant;
