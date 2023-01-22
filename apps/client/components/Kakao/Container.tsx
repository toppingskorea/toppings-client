import { css } from "@emotion/react";
import { size } from "@toss/emotion-utils";
import type { CSSProperties, ReactNode } from "react";
import { useKakaoMap } from "~/contexts";
import useMapEvent from "./Kakao.hooks";

type Props = {
  onClick?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void;
  onDragStart?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void;
  onDragEnd?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void;
  onZoomChanged?: (map: kakao.maps.Map) => void;
  onTilesloaded?: (map: kakao.maps.Map) => void;
  style?: CSSProperties;
  children?: ReactNode;
};

const Container = ({
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  onTilesloaded,
  style,
  children
}: Props) => {
  const { map, mapRef } = useKakaoMap();

  useMapEvent(map, "click", onClick);
  useMapEvent(map, "dragstart", onDragStart);
  useMapEvent(map, "dragend", onDragEnd);
  useMapEvent(map, "zoom_changed", onZoomChanged);
  useMapEvent(map, "tilesloaded", onTilesloaded);

  return (
    <div
      ref={mapRef}
      css={css`
        ${size.full}
        z-index: 0;
      `}
      style={{ ...style }}
    >
      {map ? children : null}
    </div>
  );
};

export default Container;
