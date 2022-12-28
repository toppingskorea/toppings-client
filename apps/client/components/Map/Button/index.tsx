import { useCurrentLocationSetter } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { CurrentPlace } from "@svgs/map";
import { position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { defaultLocation, defaultScaleChangeVariants } from "~/constants";

const MyLocationButton = () => {
  const { colors } = useTheme();
  const setCurrentLocation = useCurrentLocationSetter();

  const success: PositionCallback = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      setCurrentLocation({ latitude, longitude });
    },
    [setCurrentLocation]
  );

  const error: PositionErrorCallback = useCallback(() => {
    setCurrentLocation({
      latitude: defaultLocation.DEFAULT_LATITUDE,
      longitude: defaultLocation.DEFAULT_LONGITUDE
    });
  }, [setCurrentLocation]);

  const options: PositionOptions = useMemo(
    () => ({
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }),
    []
  );

  const getCurrentMapPosition = useCallback(() => {
    navigator.geolocation.watchPosition(success, error, options);
  }, [error, options, success]);

  return (
    <motion.button
      type="button"
      onClick={getCurrentMapPosition}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      variants={defaultScaleChangeVariants}
      css={css`
        ${position("absolute", {
          bottom: 16,
          left: 17
        })}
        padding: 8px;
        border-radius: 8px;
        background-color: ${colors.primary};
        z-index: 10;
      `}
    >
      <CurrentPlace />
    </motion.button>
  );
};

export default MyLocationButton;
