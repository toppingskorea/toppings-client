import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";
import {
  useClickedCurrentPositionState,
  useCurrentLocationSetter
} from "~/recoil/atoms";

const useCurrentLocation = () => {
  const setCurrentLocation = useCurrentLocationSetter();
  const [clickedCurrentPosition, setClickedCurrentPosition] =
    useClickedCurrentPositionState();

  const success: PositionCallback = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      if (latitude && longitude)
        setClickedCurrentPosition({ latitude, longitude });

      setCurrentLocation({ latitude, longitude });
    },
    [setCurrentLocation, setClickedCurrentPosition]
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

    navigator.geolocation.watchPosition(success, error, options);
  }, [
    clickedCurrentPosition.latitude,
    clickedCurrentPosition.longitude,
    error,
    options,
    setCurrentLocation,
    success
  ]);

  return { getCurrentMapPosition };
};

export default useCurrentLocation;
