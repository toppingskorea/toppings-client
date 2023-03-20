import { useCallback, useEffect } from "react";
import { useKakaoMap } from "~/contexts";

export const useMapEvent = (
  target: Map.EventTarget | null,
  type: string,
  callback?: Map.WithMouseEvent
) => {
  const { map, render } = useKakaoMap();

  const handler = useCallback(
    (e: Map.KakaoMouseEvent) => {
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
