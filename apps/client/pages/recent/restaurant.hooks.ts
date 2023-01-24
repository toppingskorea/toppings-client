import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useSearchByFilteringSetter
} from "@atoms/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByName,
  useUploadRecentHistory
} from "~/server/recent";

const useRestaurant = () => {
  useSetNavigation({
    top: {
      marginBottom: 37,
      backDirectlyURL: "/recent"
    }
  });

  const { push } = useRouter();
  const [restaurantList, setRestaurantList] =
    useState<Restaurant.SearchByFilteringDTO[]>();
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

export default useRestaurant;
