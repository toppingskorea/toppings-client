import {
  useCurrentLocationSetter,
  useCurrentSelectKeywordSetter,
  useMapSearchByCountryReset,
  useSearchRestaurantIdSetter
} from "@atoms/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantNameByFiltering,
  useUploadRecentHistory
} from "~/server/recent";

const useRestaurant = () => {
  const { push } = useRouter();
  const [restaurantList, setRestaurantList] =
    useState<Restaurant.SearchByCountryDTO[]>();
  const setCurrentLocation = useCurrentLocationSetter();
  const resetMapSearchByCountry = useMapSearchByCountryReset();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setSearchRestaurantId = useSearchRestaurantIdSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantNameByFilteringMutate } =
    useFetchRestaurantNameByFiltering({
      onSuccess: data => {
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

    fetchRestaurantNameByFilteringMutate(debouncedValue);
  }, [debouncedValue, fetchRestaurantNameByFilteringMutate]);

  const restaurantCardClickHandler = (item: Restaurant.SearchByCountryDTO) => {
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
    fetchRestaurantNameByFilteringMutate,
    restaurantCardClickHandler
  };
};

export default useRestaurant;
