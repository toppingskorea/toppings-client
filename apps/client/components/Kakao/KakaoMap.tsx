import type { CSSProperties, ReactNode } from "react";
import { defaultLocation } from "~/constants";
import { MapProvider } from "~/contexts";
import {
  CurrentLocationButton,
  FilteringButton,
  ViewStatusButton
} from "./Buttons";
import Container from "./Container";

// 서울의 경도, 위도
export const DEFAULT_INITIAL_CENTER = {
  latitude: defaultLocation.DEFAULT_LATITUDE,
  longitude: defaultLocation.DEFAULT_LONGITUDE
};

interface Props {
  center?: Common.Coordinate;
  level?: number;
  minLevel?: number;
  maxLevel?: number;
  draggable?: boolean;
  zoomable?: boolean;
  onClick?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void;
  onDragStart?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void;
  onDragEnd?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void;
  onZoomChanged?: (map: kakao.maps.Map) => void;
  onTilesloaded?: (map: kakao.maps.Map) => void;
  onLoaded?: (map: kakao.maps.Map) => void;
  onBoundChange?: (map: kakao.maps.Map) => void;
  style?: CSSProperties;
  children?: ReactNode;
}

const KakaoMap = ({
  center = DEFAULT_INITIAL_CENTER,
  level = 6,
  minLevel = 1,
  maxLevel = 8,
  draggable = true,
  zoomable = true,
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  onTilesloaded,
  style,
  onLoaded,
  onBoundChange,
  children
}: Props) => {
  return (
    <MapProvider
      center={center}
      level={level}
      minLevel={minLevel}
      maxLevel={maxLevel}
      onLoaded={onLoaded}
      onBoundChange={onBoundChange}
      draggable={draggable}
      zoomable={zoomable}
    >
      <Container
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onZoomChanged={onZoomChanged}
        onTilesloaded={onTilesloaded}
        style={style}
      >
        {children}
      </Container>
    </MapProvider>
  );
};

KakaoMap.CurrentLocationButton = CurrentLocationButton;
KakaoMap.FilteringButton = FilteringButton;
KakaoMap.ViewStatusButton = ViewStatusButton;

export default KakaoMap;
