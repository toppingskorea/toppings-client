import { useCurrentPositionLoadingSetter } from "@atoms/index";
import { useCallback, useMemo } from "react";
import { defaultLocation } from "~/constants";
import { useMapStore } from "~/stores/map";

const useCurrentLocation = () => {
  const { dispatchCurrentLocation, dispatchFixedCurrentLocation } = useMapStore(
    state => state
  );
  const setCurrentPositionLoading = useCurrentPositionLoadingSetter();

  const success: PositionCallback = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      if (latitude && longitude) setCurrentPositionLoading(false);

      dispatchCurrentLocation({ latitude, longitude });
      dispatchFixedCurrentLocation({ latitude, longitude });
    },
    [
      dispatchCurrentLocation,
      dispatchFixedCurrentLocation,
      setCurrentPositionLoading
    ]
  );

  const error: PositionErrorCallback = useCallback(() => {
    setCurrentPositionLoading(false);

    dispatchCurrentLocation({
      latitude: defaultLocation.DEFAULT_LATITUDE,
      longitude: defaultLocation.DEFAULT_LONGITUDE
    });
  }, [dispatchCurrentLocation, setCurrentPositionLoading]);

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
