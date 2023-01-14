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

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: Map.EventsType,
  handler: () => void
) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (target) kakao.maps.event.addListener(target, type, handler);

    return () => {
      if (target) kakao.maps.event.removeListener(target, type, handler);
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
      } else {
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
