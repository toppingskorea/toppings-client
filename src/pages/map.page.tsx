import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import MapView from "~/components/MapView";
import { withCurrentLocation } from "~/recoil/selectors";

const Map = () => {
  const setCurrentLocation = useSetRecoilState(withCurrentLocation);

  const getCurrentMapPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentLocation({ latitude, longitude });
      }
    );
  }, [setCurrentLocation]);

  return (
    <MapView>
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
    </MapView>
  );
};

export default Map;
