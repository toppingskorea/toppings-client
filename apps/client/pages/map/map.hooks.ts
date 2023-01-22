import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSetNavigation } from "~/hooks";
import {
  useCurrentHabitTitleValue,
  useCurrentLocationReset,
  useCurrentLocationState,
  useCurrentSelectCategoryValue,
  useCurrentSelectKeywordValue,
  useSearchByFilteringState
} from "~/recoil/atoms";
import {
  useFetchDefaultMap,
  useFetchRestaurantByCountry,
  useFetchRestaurantByEatingHabit
} from "~/server/recent";

const useMap = () => {
  const [_bounds, setBounds] = useState<Map.KakaoBounds>();
  const { push } = useRouter();

  const [currentLocation, setCurrentLocation] = useCurrentLocationState();
  const currentLocationReset = useCurrentLocationReset();
  const [searchByFilteringList, setSearchByFilteringList] =
    useState<Restaurant.SearchByFilteringDTO[]>();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const currentSelectCategory = useCurrentSelectCategoryValue();
  const [mapSearchByFiltering, setMapSearchByFiltering] =
    useSearchByFilteringState();
  const currentHabitTitle = useCurrentHabitTitleValue();

  const mapMutateOnSuccess = useCallback(
    (data: Restaurant.SearchByFilteringDTO[]) => {
      setSearchByFilteringList(data);
      setMapSearchByFiltering(data);
    },
    [setMapSearchByFiltering]
  );

  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: mapMutateOnSuccess
  });

  // 필터링버튼 키워드를 exit 했을 경우 맵 bounds 안의 식당들을 불러옵니다
  useEffect(() => {
    if (!currentSelectKeyword) {
      defaultMapMutate(_bounds!);
    }
  }, [_bounds, currentLocationReset, currentSelectKeyword, defaultMapMutate]);

  useSetNavigation({
    bottom: true
  });

  const { mutate: fetchRestaurantByEatingHabitMutate } =
    useFetchRestaurantByEatingHabit({
      onSuccess: mapMutateOnSuccess
    });

  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: mapMutateOnSuccess
    });

  const mapEventHandler = (map: kakao.maps.Map) => {
    const bounds = map.getBounds() as Map.KakaoBounds;
    const getCenter = map.getCenter();

    setCurrentLocation({
      latitude: getCenter.getLat(),
      longitude: getCenter.getLng()
    });

    setBounds(bounds);

    // useEffect에서 해당 기능을 처리해줍니다.
    if (!currentSelectKeyword) {
      return;
    }

    switch (currentSelectCategory) {
      case "Habit":
        fetchRestaurantByEatingHabitMutate({
          habit: currentSelectKeyword,
          habitTitle: currentHabitTitle,
          direction: bounds
        });
        break;
      case "Country":
        fetchRestaurantByCountryMutate({
          country: currentSelectKeyword,
          direction: bounds
        });
        break;
      default:
        setSearchByFilteringList(mapSearchByFiltering);
    }
  };

  return {
    currentLocation,
    mapEventHandler,
    currentSelectCategory,
    searchByFilteringList,
    push
  };
};

export default useMap;
