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
  // const setMapBounds = useMapBoundsSetter();
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
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // test용 주석(삭제 추후에 할 것임)
        // const positions = [
        //   {
        //     title: "카카오",
        //     latLng: new kakao.maps.LatLng(33.450705, 126.570677)
        //   },
        //   {
        //     title: "생태연못",
        //     latLng: new kakao.maps.LatLng(33.450936, 126.569477)
        //   },
        //   {
        //     title: "텃밭",
        //     latLng: new kakao.maps.LatLng(33.450879, 126.56994)
        //   },
        //   {
        //     title: "근린공원",
        //     latLng: new kakao.maps.LatLng(33.451393, 126.570738)
        //   }
        // ];

        if (mapSearchByCountry && mapSearchByCountry.length) {
          const positions = mapSearchByCountry.map(item => ({
            title: item.name,
            latLng: new kakao.maps.LatLng(item.latitude, item.longitude)
          }));
          const imageSize = new kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          positions.forEach(item => {
            const marker = new kakao.maps.Marker({
              map,
              position: item.latLng,
              title: item.title,
              image: markerImage
            });

            marker.setMap(map);
          });

          map.panTo(positions[0].latLng);
        } else {
          const marker = new kakao.maps.Marker({
            position: latLng
          });

          marker.setMap(map);
        }

        setKakaoMap(map);
      }
    });
  }, [currentLocation.latitude, currentLocation.longitude, mapSearchByCountry]);

  const providerValue = useMemo(() => ({ map: kakaoMap, mapRef }), [kakaoMap]);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
