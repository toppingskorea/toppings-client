/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Context, useKakaoDebounce } from "./MapProvider.hooks";

type Props = {
  center: Common.Coordinate;
  level: number;
  draggable: boolean;
  zoomable: boolean;
  maxLevel: number;
  minLevel: number;
  onLoaded?: (map: kakao.maps.Map) => void;
  onBoundChange?: (map: kakao.maps.Map) => void;
  debounceDelay?: number;
  children: ReactNode;
};

const MapProvider = ({
  center,
  level,
  draggable,
  zoomable,
  maxLevel,
  minLevel,
  onLoaded,
  onBoundChange,
  debounceDelay = 200,
  children
}: Props) => {
  const [, setRender] = useState({});
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const render = () => setRender(() => {});

  useEffect(() => {
    kakao.maps.load(() => {
      if (mapRef.current) {
        const newMap = new window.kakao.maps.Map(mapRef.current, {
          draggable: true,
          center: new kakao.maps.LatLng(center.latitude, center.longitude),
          level
        });
        if (maxLevel) {
          newMap.setMaxLevel(maxLevel);
        }

        setMap(newMap);
        onLoaded?.(newMap);
      }
    });
  }, []);

  useEffect(() => {
    map?.setZoomable(zoomable);

    if (!zoomable) {
      map?.setLevel(map?.getLevel());
      map?.setMaxLevel(map?.getLevel());
      map?.setMinLevel(map?.getLevel());
    }

    if (zoomable) {
      map?.setMaxLevel(maxLevel);
      map?.setMinLevel(minLevel);
    }
  }, [map, zoomable, level, maxLevel, minLevel]);

  useEffect(() => {
    map?.setDraggable(draggable);
  }, [map, draggable]);

  useEffect(() => {
    map?.setLevel(level);
  }, [map, level]);

  useEffect(() => {
    if (center) {
      map?.panTo(new kakao.maps.LatLng(center.latitude, center.longitude));
    }

    map?.relayout();
  }, [map, center]);

  const bounds = map?.getBounds();
  const northEast = bounds?.getNorthEast();
  const southWest = bounds?.getSouthWest();

  const debouncedNorthEastLat = useKakaoDebounce(
    northEast?.getLat(),
    debounceDelay
  );
  const debouncedNorthEastLng = useKakaoDebounce(
    northEast?.getLng(),
    debounceDelay
  );
  const debouncedSouthWestLat = useKakaoDebounce(
    southWest?.getLat(),
    debounceDelay
  );
  const debouncedSouthWestLng = useKakaoDebounce(
    southWest?.getLng(),
    debounceDelay
  );

  useEffect(() => {
    if (
      map &&
      debouncedNorthEastLat &&
      debouncedNorthEastLng &&
      debouncedSouthWestLat &&
      debouncedSouthWestLng
    ) {
      requestAnimationFrame(() => {
        onBoundChange?.(map);
      });
    }
  }, [
    debouncedNorthEastLat,
    debouncedNorthEastLng,
    debouncedSouthWestLat,
    debouncedSouthWestLng
  ]);

  return (
    <Context.Provider value={{ map, mapRef, render }}>
      {children}
    </Context.Provider>
  );
};

export default MapProvider;
