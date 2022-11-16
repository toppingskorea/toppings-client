import { useEffect } from "react";

type EventsType =
  | "center_changed"
  | "zoom_start"
  | "zoom_changed"
  | "bounds_changed"
  | "click"
  | "dblclick"
  | "rightclick"
  | "mousemove"
  | "dragstart"
  | "drag"
  | "dragend"
  | "idle"
  | "tilesloaded"
  | "maptypeid_changed";

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: EventsType,
  handler: () => void
) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (target) {
      kakao.maps.event.addListener(target, type, handler);

      return () => kakao.maps.event.removeListener(target, type, handler);
    }
  }, [handler, target, type]);
};

export default useMapEvent;
