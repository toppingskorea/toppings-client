import { css } from "@emotion/react";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useMap } from "~/contexts";
import { mapBoundsAtom } from "~/recoil/atoms/map";
import MyLocationButton from "./Button";
import useMapEvent from "./Map.hooks";

const Map = ({ children }: Util.PropsWithChild) => {
  const setMapBounds = useSetRecoilState(mapBoundsAtom);
  const { map, mapRef } = useMap();

  const mapEventHandler = useCallback(() => {
    if (map) setMapBounds(map.getBounds());
  }, [map, setMapBounds]);

  useMapEvent(map, "dragend", mapEventHandler);
  useMapEvent(map, "zoom_changed", mapEventHandler);

  // TODO: 디자인 맞춰서 width, height 변경하기
  return (
    <div
      ref={mapRef}
      css={css`
        width: 100%;
        height: 500px;
      `}
    >
      {children}
    </div>
  );
};

Map.MyLocationButton = MyLocationButton;

export default Map;
