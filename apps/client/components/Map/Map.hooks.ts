import {
  useCurrentLocationSetter,
  useCurrentSelectCategoryValue,
  useCurrentSelectKeywordValue,
  useMapBoundsSetter,
  useMapSearchByCountrySetter,
  type Direction
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { diets } from "~/constants/data/common";
import { useMap } from "~/contexts";
import {
  useFetchDefaultMap,
  useFetchEatingHabitByFiltering,
  useFetchRestaurantByCountry
} from "~/server/recent";

const useMapEvent = (type: Map.EventsType, handler: () => void) => {
  const { map } = useMapHook();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (map) kakao.maps.event.addListener(map, type, handler);

    return () => {
      if (map) kakao.maps.event.removeListener(map, type, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, type]);
};

const useMapHook = () => {
  const { zIndex } = useTheme();
  const { map, mapRef } = useMap();
  const setMapBounds = useMapBoundsSetter();
  const setCurrentLocation = useCurrentLocationSetter();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const currentSelectCategory = useCurrentSelectCategoryValue();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: data => {
      setMapSearchByCountry(data);
    }
  });
  const { mutate: fetchEatingHabitByFilteringMutate } =
    useFetchEatingHabitByFiltering({
      onSuccess: data => {
        setMapSearchByCountry(data);
      }
    });
  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: data => {
        setMapSearchByCountry(data);
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
        fetchEatingHabitByFilteringMutate({
          habit: currentSelectKeyword,
          habitTitle: diets.includes(
            currentSelectKeyword as Util.ElementType<typeof diets>
          )
            ? "Diet"
            : "Religion",
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
