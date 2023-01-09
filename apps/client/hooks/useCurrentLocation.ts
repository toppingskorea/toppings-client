import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";
import { useCurrentLocationSetter } from "~/recoil/atoms";

const useCurrentLocation = () => {
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
      maximumAge: 0
    }),
    []
  );

  const getCurrentMapPosition = useCallback(() => {
    navigator.geolocation.watchPosition(success, error, options);
  }, [error, options, success]);

  return { getCurrentMapPosition };
};

export default useCurrentLocation;
