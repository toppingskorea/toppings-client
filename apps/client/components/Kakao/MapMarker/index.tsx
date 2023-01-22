import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useKakaoMap } from "~/contexts";

const MapMarker = ({
  position,
  children
}: PropsWithChildren<{ position: Common.Coordinate }>) => {
  const { map } = useKakaoMap();
  const container = useRef(document.createElement("div"));

  const overlayPosition = useMemo(
    () => new kakao.maps.LatLng(position.latitude, position.longitude),
    [position.latitude, position.longitude]
  );

  const overlay = useMemo(() => {
    const kakaoCustomOverlay = new kakao.maps.CustomOverlay({
      clickable: true,
      position: overlayPosition,
      content: container.current
    });
    container.current.style.display = "none";

    return kakaoCustomOverlay;
  }, [overlayPosition]);

  useEffect(() => {
    overlay.setMap(map);

    return () => overlay.setMap(null);
  }, [overlay, map]);

  return (
    container.current.parentElement &&
    createPortal(children, container.current.parentElement)
  );
};

export default MapMarker;
