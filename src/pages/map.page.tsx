import { css } from "@emotion/react";
import { motion } from "framer-motion";
import Map from "~/components/Map";
import { defaultScaleChangeVariants } from "~/constants";
import { MapProvider } from "~/contexts";

const MapPage = () => {
  return (
    <MapProvider>
      <Map>
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          variants={defaultScaleChangeVariants}
          css={css`
            position: absolute;
            top: 15px;
            left: 15px;
            z-index: 10;
          `}
        >
          <Map.MyLocationButton />
        </motion.div>
      </Map>
    </MapProvider>
  );
};

export default MapPage;
