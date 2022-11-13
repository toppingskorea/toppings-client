import { css } from "@emotion/react";
import { motion } from "framer-motion";
import MapView from "~/components/MapView";

const Map = () => {
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
        <MapView.Button />
      </motion.div>
    </MapView>
  );
};

export default Map;
