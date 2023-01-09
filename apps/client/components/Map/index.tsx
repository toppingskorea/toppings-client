import { useMapBoundsSetter, type Direction } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { height100, width100 } from "@toss/emotion-utils";
import { useCallback } from "react";
import { useMap } from "~/contexts";
import FilteringButton from "./Button/FilteringButton";
import ViewStatusButton from "./Button/ViewStatusButton";
import MyLocationButton from "./Button/MyLocationButton";
import RecentButton from "./Button/RecentButton";
import useMapEvent from "./Map.hooks";

const Map = ({ children }: Util.PropsWithChild) => {
  const { zIndex } = useTheme();
  const setMapBounds = useMapBoundsSetter();
  const { map, mapRef } = useMap();

  const mapEventHandler = useCallback(() => {
    if (map) {
      setMapBounds(map.getBounds() as kakao.maps.LatLngBounds & Direction);
    }
  }, [map, setMapBounds]);

  useMapEvent(map, "dragend", mapEventHandler);
  useMapEvent(map, "zoom_changed", mapEventHandler);
  useMapEvent(map, "tilesloaded", mapEventHandler);

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
