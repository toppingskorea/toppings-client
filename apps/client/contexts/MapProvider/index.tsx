import { useCurrentLocationValue } from "@atoms/index";
import { useMapSearchByCountryValue } from "@atoms/map";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject
} from "react";

const Context = createContext({
  map: null,
  mapRef: { current: null }
} as {
  map: kakao.maps.Map | null;
  mapRef: RefObject<HTMLDivElement>;
});

export const useMap = () => useContext(Context);

export const MapProvider = ({ children }: Util.PropsWithChild) => {
  const mapSearchByCountry = useMapSearchByCountryValue();
  const currentLocation = useCurrentLocationValue();
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

        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
        const imageSize = new kakao.maps.Size(24, 35);
        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        if (mapSearchByCountry && mapSearchByCountry.length) {
          const positions = mapSearchByCountry.map(item => ({
            title: item.name,
            latLng: new kakao.maps.LatLng(item.latitude, item.longitude)
          }));

          positions.forEach(item => {
            const marker = new kakao.maps.Marker({
              map,
              position: item.latLng,
              title: item.title,
              image: markerImage
            });

            map.setCenter(latLng);
            marker.setMap(map);
          });

          map.panTo(positions[0].latLng);
        } else {
          const marker = new kakao.maps.Marker({
            position: latLng,
            image: markerImage
          });

          map.setCenter(latLng);
          // marker.setMap(map);
        }

        setKakaoMap(map);
      }
    });
  }, [currentLocation.latitude, currentLocation.longitude, mapSearchByCountry]);

  const providerValue = useMemo(() => ({ map: kakaoMap, mapRef }), [kakaoMap]);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
