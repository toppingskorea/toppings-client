import { useEffect, useRef, type PropsWithChildren } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentLocationAtom } from "~/recoil/atoms";
import { withKakaoMap } from "~/recoil/selectors";

const MapView = ({ children }: Required<PropsWithChildren>) => {
  const currentLocation = useRecoilValue(currentLocationAtom);
  const setKakaoMap = useSetRecoilState(withKakaoMap);

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
      }
    });
  }, [currentLocation.latitude, currentLocation.longitude, setKakaoMap]);

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

export default MapView;
