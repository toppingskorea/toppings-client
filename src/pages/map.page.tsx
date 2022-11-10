import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentLocationAtom } from "~/recoil/atoms";

const Map = () => {
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      ),
      level: 2
    };
    const map = new kakao.maps.Map(container as HTMLElement, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      )
    });

    marker.setMap(map);

    kakao.maps.event.addListener(map, "zoom_changed", () => {
      const bounds = map.getBounds();
      const getBounds = bounds.toString();

      console.log("zoom_changed: ", getBounds);
    });
    kakao.maps.event.addListener(map, "dragend", () => {
      const bounds = map.getBounds();
      const getBounds = bounds.toString();

      console.log("drag: ", getBounds);
    });
  }, [currentLocation.latitude, currentLocation.longitude]);

  const getCurrentMapPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentLocation({ latitude, longitude });
      }
    );
  }, [setCurrentLocation]);

  return (
    <>
      <div
        id="myMap"
        style={{
          width: "100%",
          height: "500px"
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        css={css`
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 10;
        `}
      >
        <button type="button" onClick={getCurrentMapPosition}>
          내 위치
        </button>
      </motion.div>
    </>
  );
};

export default Map;
