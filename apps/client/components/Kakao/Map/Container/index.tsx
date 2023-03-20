import { css } from "@emotion/react";
import { size } from "@toss/emotion-utils";
import { useKakaoMap } from "~/contexts";
import { useMapEvent } from "../Map.hooks";
import type { Props } from "./Container.types";

export const Container = ({
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
