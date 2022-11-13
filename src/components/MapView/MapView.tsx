import {
  memo,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "~/constants";
import { currentLocationAtom } from "~/recoil/atoms";
import { kakaoMapAtom } from "~/recoil/atoms/map";
import {
  withCurrentLocation,
  withKakaoMap,
  withMapBounds
} from "~/recoil/selectors";

// https://devtalk.kakao.com/t/topic/106470/8

const Button = memo(() => {
  const setCurrentLocation = useSetRecoilState(withCurrentLocation);

  const success: PositionCallback = ({
    coords: { latitude, longitude }
  }: GeolocationPosition) => {
    setCurrentLocation({ latitude, longitude });
  };

  const error: PositionErrorCallback = () => {
    setCurrentLocation({
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    });
  };

  const options: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

  const getCurrentMapPosition = () => {
    navigator.geolocation.watchPosition(success, error, options);
  };

  return (
    <button type="button" onClick={getCurrentMapPosition}>
      내 위치
    </button>
  );
});

const MapView = ({ children }: Required<PropsWithChildren>) => {
  const currentLocation = useRecoilValue(currentLocationAtom);
  const setKakaoMap = useSetRecoilState(withKakaoMap);
  const setMapBounds = useSetRecoilState(withMapBounds);
  const kakaoMap = useRecoilValue(kakaoMapAtom);
  const [, setNewMap] = useState<kakao.maps.Map | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);

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
        setNewMap(map);

        kakao.maps.event.addListener(map, "dragend", () => {
          setMapBounds(map.getBounds());
        });
      }
    });
  }, [
    currentLocation.latitude,
    currentLocation.longitude,
    setKakaoMap,
    setMapBounds
  ]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px"
      }}
    >
      {children}
    </div>
  );
};

MapView.Button = Button;

export default MapView;
