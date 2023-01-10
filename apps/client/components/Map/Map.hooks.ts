import { useEffect } from "react";

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: Map.EventsType,
  handler: () => void
) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (target) kakao.maps.event.addListener(target, type, handler);

    return () => {
      if (target) kakao.maps.event.removeListener(target, type, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, type]);
};

export default useMapEvent;
