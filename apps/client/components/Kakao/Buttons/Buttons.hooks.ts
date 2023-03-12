import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";
import { useMapStore } from "~/stores/map";

const useCurrentLocation = () => {
  const {
    dispatchCurrentLocation,
    dispatchFixedCurrentLocation,
    dispatchCurrentLocationLoading
  } = useMapStore(state => state);

  const success: PositionCallback = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      if (latitude && longitude) dispatchCurrentLocationLoading(false);

      dispatchCurrentLocation({ latitude, longitude });
      dispatchFixedCurrentLocation({ latitude, longitude });
    },
    [
      dispatchCurrentLocation,
      dispatchCurrentLocationLoading,
      dispatchFixedCurrentLocation
    ]
  );

  const error: PositionErrorCallback = useCallback(() => {
    dispatchCurrentLocationLoading(false);

    dispatchCurrentLocation({
      latitude: defaultLocation.DEFAULT_LATITUDE,
      longitude: defaultLocation.DEFAULT_LONGITUDE
    });
  }, [dispatchCurrentLocation, dispatchCurrentLocationLoading]);

  const options: PositionOptions = useMemo(
    () => ({
      timeout: 60000, // 60초
      maximumAge: 0
    }),
    []
  );

  const getCurrentMapPosition = useCallback(() => {
    dispatchCurrentLocationLoading(true);

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatchCurrentLocationLoading, error, options, success]);

  return { getCurrentMapPosition };
};

export default useCurrentLocation;
