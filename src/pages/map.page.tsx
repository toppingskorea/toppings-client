import { css } from "@emotion/react";
import { motion } from "framer-motion";
import MapView from "~/components/MapView";
import { defaultScaleChangeVariants } from "~/constants";

export default () => {
  return (
    <MapView>
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
        <MapView.Button />
      </motion.div>
    </MapView>
  );
};
