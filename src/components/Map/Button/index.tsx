import { useCurrentLocationSetter } from "@atoms/index";
import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";

const MyLocationButton = () => {
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
    <button type="button" onClick={getCurrentMapPosition}>
      내 위치
    </button>
  );
};

export default MyLocationButton;
