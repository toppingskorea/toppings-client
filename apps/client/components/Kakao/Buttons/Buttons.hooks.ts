import {
  useCurrentLocationSetter,
  useCurrentPositionLoadingSetter,
  useFixedCurrentLocationSetter
} from "@atoms/index";
import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";

const useCurrentLocation = () => {
  const setCurrentLocation = useCurrentLocationSetter();
  const setCurrentPositionLoading = useCurrentPositionLoadingSetter();
  const setFixedCurrentLocationSetter = useFixedCurrentLocationSetter();

  const success: PositionCallback = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      if (latitude && longitude) setCurrentPositionLoading(false);

      setCurrentLocation({ latitude, longitude });
      setFixedCurrentLocationSetter({ latitude, longitude });
    },
    [
      setCurrentLocation,
      setCurrentPositionLoading,
      setFixedCurrentLocationSetter
    ]
  );

  const error: PositionErrorCallback = useCallback(() => {
    setCurrentPositionLoading(false);

    setCurrentLocation({
      latitude: defaultLocation.DEFAULT_LATITUDE,
      longitude: defaultLocation.DEFAULT_LONGITUDE
    });
  }, [setCurrentLocation, setCurrentPositionLoading]);

  const options: PositionOptions = useMemo(
    () => ({
      timeout: 60000, // 60초
      maximumAge: 0
    }),
    []
  );

  const getCurrentMapPosition = useCallback(() => {
    setCurrentPositionLoading(true);

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [error, options, setCurrentPositionLoading, success]);

  return { getCurrentMapPosition };
};

export default useCurrentLocation;
