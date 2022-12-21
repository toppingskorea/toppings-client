import { css, useTheme } from "@emotion/react";
import { useCallback } from "react";
import { useMap } from "~/contexts";
import { useMapBoundsSetter, type Direction } from "~/recoil/atoms";
import FilteringButton from "./Button/FilteringButton";
import MyLocationButton from "./Button/MyLocationButton";
import RecentButton from "./Button/RecentButton";
import useMapEvent from "./Map.hooks";

const Map = ({ children }: Util.PropsWithChild) => {
  const { dimensions } = useTheme();
  const setMapBounds = useMapBoundsSetter();
  const { map, mapRef } = useMap();

  const mapEventHandler = useCallback(() => {
    if (map) {
      setMapBounds(map.getBounds() as kakao.maps.LatLngBounds & Direction);
    }
  }, [map, setMapBounds]);

  useMapEvent(map, "dragend", mapEventHandler);
  useMapEvent(map, "zoom_changed", mapEventHandler);

  return (
    <div
      ref={mapRef}
      css={css`
        width: 100%;
        height: calc(100% - ${dimensions.bottomNavigationHeight}px);
      `}
    >
      {children}
    </div>
  );
};

Map.MyLocationButton = MyLocationButton;
Map.RecentButton = RecentButton;
Map.FilteringButton = FilteringButton;

export default Map;
