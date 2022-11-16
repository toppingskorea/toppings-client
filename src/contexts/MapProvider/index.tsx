import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentLocationAtom } from "~/recoil/atoms";
import { mapBoundsAtom } from "~/recoil/atoms/map";

const Context = createContext({
  map: null,
  mapRef: { current: null }
} as {
  map: kakao.maps.Map | null;
  mapRef: RefObject<HTMLDivElement>;
});

export const useMap = () => useContext(Context);

export const MapProvider = ({ children }: Util.PropsWithChild) => {
  const currentLocation = useRecoilValue(currentLocationAtom);
  const setMapBounds = useSetRecoilState(mapBoundsAtom);
  const mapRef = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    kakao.maps.load(() => {
      if (mapRef.current) {
        const latLng = new kakao.maps.LatLng(
          currentLocation.latitude,
          currentLocation.longitude
        );
        const options = {
          center: latLng,
          level: 2
        };
        const map = new kakao.maps.Map(mapRef.current, options);

        const marker = new kakao.maps.Marker({
          position: latLng
        });

        marker.setMap(map);

        setKakaoMap(map);
      }
    });
  }, [currentLocation.latitude, currentLocation.longitude, setMapBounds]);

  const providerValue = useMemo(() => ({ map: kakaoMap, mapRef }), [kakaoMap]);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
