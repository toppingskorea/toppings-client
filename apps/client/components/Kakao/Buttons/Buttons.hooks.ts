import {
  useClickedCurrentPositionState,
  useCurrentLocationSetter,
  useCurrentPositionLoadingSetter
} from "@atoms/index";
import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";

const useCurrentLocation = () => {
  const setCurrentLocation = useCurrentLocationSetter();
  const [clickedCurrentPosition, setClickedCurrentPosition] =
    useClickedCurrentPositionState();
  const setCurrentPositionLoading = useCurrentPositionLoadingSetter();

  const success: PositionCallback = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      if (latitude && longitude) {
        setClickedCurrentPosition({ latitude, longitude });
        setCurrentPositionLoading(false);
      }

      setCurrentLocation({ latitude, longitude });
    },
    [setCurrentLocation, setClickedCurrentPosition, setCurrentPositionLoading]
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
    if (clickedCurrentPosition.latitude && clickedCurrentPosition.longitude) {
      setCurrentLocation({
        latitude: clickedCurrentPosition.latitude,
        longitude: clickedCurrentPosition.longitude
      });

      return;
    }

    setCurrentPositionLoading(true);

    navigator.geolocation.watchPosition(success, error, options);
  }, [
    clickedCurrentPosition.latitude,
    clickedCurrentPosition.longitude,
    error,
    options,
    setCurrentLocation,
    setCurrentPositionLoading,
    success
  ]);

  return { getCurrentMapPosition };
};

export default useCurrentLocation;
