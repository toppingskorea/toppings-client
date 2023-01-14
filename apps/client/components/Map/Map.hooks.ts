import {
  useCurrentHabitTitleValue,
  useCurrentLocationSetter,
  useCurrentSelectCategoryValue,
  useCurrentSelectKeywordValue,
  useMapBoundsSetter,
  useMapSearchByFilteringSetter,
  type Direction
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { useCallback, useEffect } from "react";
import { useMap } from "~/contexts";
import {
  useFetchDefaultMap,
  useFetchRestaurantByCountry,
  useFetchRestaurantByEatingHabit
} from "~/server/recent";

const useMapEvent = (type: Map.EventsType) => {
  const { map, mapEventHandler } = useMapHook();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (map) kakao.maps.event.addListener(map, type, mapEventHandler);

    return () => {
      if (map) kakao.maps.event.removeListener(map, type, mapEventHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapEventHandler, type]);
};

const useMapHook = () => {
  const { zIndex } = useTheme();
  const { map, mapRef } = useMap();
  const setMapBounds = useMapBoundsSetter();
  const setCurrentLocation = useCurrentLocationSetter();
  const setMapSearchByCountry = useMapSearchByFilteringSetter();
  const currentSelectCategory = useCurrentSelectCategoryValue();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const currentHabitTitle = useCurrentHabitTitleValue();

  const mutateOnSuccess = useCallback(
    (data: Restaurant.SearchByFilteringDTO[]) => {
      setMapSearchByCountry(data);
    },
    [setMapSearchByCountry]
  );

  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: mutateOnSuccess
  });
  const { mutate: fetchRestaurantByEatingHabitMutate } =
    useFetchRestaurantByEatingHabit({
      onSuccess: mutateOnSuccess
    });
  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: data => {
        mutateOnSuccess(data);
      }
    });

  const mapEventHandler = () => {
    if (map) {
      setMapBounds(map.getBounds() as kakao.maps.LatLngBounds & Direction);
      const position = map.getCenter();

      // 식당 하나 검색시에는 맵 이벤트가 필요 없다
      if (currentSelectCategory !== "Name")
        setCurrentLocation({
          latitude: position.getLat(),
          longitude: position.getLng()
        });

      if (!currentSelectKeyword) {
        defaultMapMutate(
          map.getBounds() as kakao.maps.LatLngBounds & Direction
        );

        return;
      }

      if (currentSelectCategory === "Habit") {
        fetchRestaurantByEatingHabitMutate({
          habit: currentSelectKeyword,
          habitTitle: currentHabitTitle,
          direction: map.getBounds() as kakao.maps.LatLngBounds & Direction
        });
      } else if (currentSelectCategory === "Country") {
        fetchRestaurantByCountryMutate({
          country: currentSelectKeyword,
          direction: map.getBounds() as kakao.maps.LatLngBounds & Direction
        });
      }
    }
  };

  return {
    map,
    mapEventHandler,
    mapRef,
    zIndex
  };
};

export { useMapEvent, useMapHook };
