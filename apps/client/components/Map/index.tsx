import {
  useCurrentLocationSetter,
  useMapBoundsSetter,
  useMapSearchByBoundsSetter,
  useMapSearchByCountrySetter,
  type Direction
} from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { height100, width100 } from "@toss/emotion-utils";
import { useEffect } from "react";
import { useMap } from "~/contexts";
import { useFetchDefaultMap } from "~/server/recent";
import FilteringButton from "./Button/FilteringButton";
import MyLocationButton from "./Button/MyLocationButton";
import RecentButton from "./Button/RecentButton";
import ViewStatusButton from "./Button/ViewStatusButton";
import useMapEvent from "./Map.hooks";

const Map = ({ children }: Util.PropsWithChild) => {
  const { zIndex } = useTheme();
  const { map, mapRef } = useMap();
  const setMapBounds = useMapBoundsSetter();
  const setCurrentLocation = useCurrentLocationSetter();
  const setMapSearchByBounds = useMapSearchByBoundsSetter();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: data => {
      // setMapSearchByBounds(data);
      setMapSearchByCountry(data);
    }
  });

  const mapEventHandler = () => {
    if (map) {
      setMapBounds(map.getBounds() as kakao.maps.LatLngBounds & Direction);
      console.log(map.getBounds());
      const position = map.getCenter();

      setCurrentLocation({
        latitude: position.getLat(),
        longitude: position.getLng()
      });

      defaultMapMutate(map.getBounds() as kakao.maps.LatLngBounds & Direction);
    }
  };

  useMapEvent(map, "dragend", mapEventHandler);
  useMapEvent(map, "zoom_changed", mapEventHandler);
  // useMapEvent(map, "", mapEventHandler);

  useEffect(() => {
    if (map) {
      console.log(map.getBounds());
      setMapBounds(map.getBounds() as kakao.maps.LatLngBounds & Direction);
      defaultMapMutate(map.getBounds() as kakao.maps.LatLngBounds & Direction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mapRef}
      css={css`
        ${width100}
        ${height100}
        z-index: ${zIndex.zero};
      `}
    >
      {children}
    </div>
  );
};

Map.MyLocationButton = MyLocationButton;
Map.RecentButton = RecentButton;
Map.FilteringButton = FilteringButton;
Map.ViewStatusButton = ViewStatusButton;

export default Map;
