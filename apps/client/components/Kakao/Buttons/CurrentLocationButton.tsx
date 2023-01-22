import { css, useTheme } from "@emotion/react";
import { CurrentPlace } from "@svgs/map";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import {
  defaultLocation,
  defaultScaleChangeVariants,
  framerMocker
} from "~/constants";
import { useKakaoMap } from "~/contexts";
import { useCurrentLocationSetter } from "~/recoil/atoms";

const getCurrentLocation = (callback: (coord: [number, number]) => void) => {
  const successCallback: PositionCallback = ({
    coords: { latitude, longitude }
  }: GeolocationPosition) => {
    callback([latitude, longitude]);
  };

  const failCallback: PositionErrorCallback = () => {
    callback([
      defaultLocation.DEFAULT_LATITUDE,
      defaultLocation.DEFAULT_LONGITUDE
    ]);
  };

  const options: PositionOptions = {
    maximumAge: 0
  };

  navigator.geolocation.watchPosition(successCallback, failCallback, options);
};

const CurrentLocationButton = () => {
  const { map, render } = useKakaoMap();
  const { colors, zIndex } = useTheme();
  const setCurrentLocation = useCurrentLocationSetter();

  const handleClick = () => {
    getCurrentLocation(([latitude, longitude]) => {
      map?.panTo(new kakao.maps.LatLng(latitude, longitude));
      setCurrentLocation({
        latitude,
        longitude
      });

      setTimeout(() => {
        render();
      }, 100);
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      {...framerMocker}
      variants={defaultScaleChangeVariants}
      css={css`
        ${flex("center")}
        ${position("absolute", {
          bottom: 16,
          left: 17
        })}
        padding: 8px;
        border-radius: 8px;
        background-color: ${colors.primary};
        z-index: ${zIndex.two};
      `}
    >
      <CurrentPlace />
    </motion.button>
  );
};

export default CurrentLocationButton;
