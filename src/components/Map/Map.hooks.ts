import { useEffect } from "react";

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: Map.EventsType,
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
