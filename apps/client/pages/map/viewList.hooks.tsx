import { useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSetNavigation } from "~/hooks";
import {
  useCurrentLocationSetter,
  useCurrentSelectCategoryValue,
  useCurrentSelectKeyword,
  useCurrentSelectKeywordReset,
  useMapBoundsValue,
  useMapSearchByFilteringReset,
  useMapSearchByFilteringState
} from "~/recoil/atoms";
import { useFetchDefaultMap, useUploadRecentHistory } from "~/server/recent";

const useViewList = () => {
  const { colors, zIndex } = useTheme();
  const { push, back, replace } = useRouter();
  const [mapSearchValue, setMapSearchByCountry] =
    useMapSearchByFilteringState();
  const resetMapSearchByCountry = useMapSearchByFilteringReset();
  const currentSelectKeywordReset = useCurrentSelectKeywordReset();
  const currentSelectCategory = useCurrentSelectCategoryValue();
  const setCurrentLocation = useCurrentLocationSetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: data => {
      setMapSearchByCountry(data);
    }
  });
  const [currentSelectKeyword, setCurrentSelectKeyword] =
    useCurrentSelectKeyword();

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    },
    bottom: true
  });

  const restaurantCardClickHandler = useCallback(
    (item: Restaurant.SearchByFilteringDTO) => {
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
      resetMapSearchByCountry();

      push("/map");
    },
    [
      push,
      resetMapSearchByCountry,
      setCurrentLocation,
      setCurrentSelectKeyword,
      uploadRecentHistoryMutate
    ]
  );

  const ExitClickHandler = () => {
    currentSelectKeywordReset();
    defaultMapMutate(mapBounds!);
    resetMapSearchByCountry();

    replace("/map");
  };

  return {
    currentSelectCategory,
    ExitClickHandler,
    zIndex,
    colors,
    currentSelectKeyword,
    mapSearchValue,
    restaurantCardClickHandler,
    back
  };
};

export default useViewList;
