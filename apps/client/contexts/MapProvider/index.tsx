import {
  useCurrentLocationValue,
  useCurrentSelectKeywordValue,
  useSearchRestaurantIdValue
} from "@atoms/index";
import {
  useMapBoundsSetter,
  useMapSearchByCountrySetter,
  useMapSearchByCountryValue,
  type Direction
} from "@atoms/map";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject
} from "react";
import { useFetchDefaultMap } from "~/server/recent";

const Context = createContext({
  map: null,
  mapRef: { current: null }
} as {
  map: kakao.maps.Map | null;
  mapRef: RefObject<HTMLDivElement>;
});

export const useMap = () => useContext(Context);

export const MapProvider = ({ children }: Util.PropsWithChild) => {
  const { replace } = useRouter();
  const mapSearchByCountry = useMapSearchByCountryValue();
  const currentLocation = useCurrentLocationValue();
  const searchRestaurantId = useSearchRestaurantIdValue();
  const setMapBounds = useMapBoundsSetter();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: data => {
      if (!mapSearchByCountry) setMapSearchByCountry(data);
    }
  });

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
          level: 4
        };
        const map = new kakao.maps.Map(mapRef.current, options);

        if (!currentSelectKeyword && map) {
          defaultMapMutate(
            map.getBounds() as kakao.maps.LatLngBounds & Direction
          );
          setMapBounds(map.getBounds() as kakao.maps.LatLngBounds & Direction);
        }

        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
        const imageSize = new kakao.maps.Size(24, 35);
        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        if (mapSearchByCountry && mapSearchByCountry.length) {
          const positions = mapSearchByCountry.map(item => ({
            id: item.id,
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

            marker.setMap(map);
            map.panTo(latLng);
            map.setCenter(latLng);

            kakao.maps.event.addListener(marker, "click", () => {
              replace(`/post/${item.id}`);
            });
          });
        } else {
          const marker = new kakao.maps.Marker({
            position: latLng,
            image: markerImage,
            clickable: true
          });
          marker.setMap(map);
          map.panTo(latLng);
          map.setCenter(latLng);

          if (searchRestaurantId >= 0) {
            kakao.maps.event.addListener(marker, "click", () => {
              replace(`/post/${searchRestaurantId}`);
            });
          }
        }

        setKakaoMap(map);
      }
    });
  }, [
    currentLocation.latitude,
    currentLocation.longitude,
    currentSelectKeyword,
    defaultMapMutate,
    mapSearchByCountry,
    replace,
    searchRestaurantId,
    setMapBounds
  ]);

  const providerValue = useMemo(() => ({ map: kakaoMap, mapRef }), [kakaoMap]);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
