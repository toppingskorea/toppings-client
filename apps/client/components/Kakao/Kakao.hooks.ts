import { useCallback, useEffect } from "react";
import { useKakaoMap } from "~/contexts";

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: string,
  callback?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
) => {
  const { map, render } = useKakaoMap();

  const handler = useCallback(
    (e: kakao.maps.event.MouseEvent) => {
      if (map) {
        callback?.(map, e);
      }

      render();
    },
    [callback, map, render]
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (target) {
      kakao.maps.event.addListener(target, type, handler);

      return () => kakao.maps.event.removeListener(target, type, handler);
    }
  }, [handler, target, type]);
};

export default useMapEvent;
