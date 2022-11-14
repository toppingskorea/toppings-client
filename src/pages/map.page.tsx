import { css } from "@emotion/react";
import { motion } from "framer-motion";
import Map from "~/components/Map";
import { defaultScaleChangeVariants } from "~/constants";

export default () => {
  return (
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
        <Map.Button />
      </motion.div>
    </Map>
  );
};
