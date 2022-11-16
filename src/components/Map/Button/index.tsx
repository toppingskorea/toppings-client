import { useSetRecoilState } from "recoil";
import { defaultLocation } from "~/constants";
import { withCurrentLocation } from "~/recoil/selectors";

const MyLocationButton = () => {
  const setCurrentLocation = useSetRecoilState(withCurrentLocation);

  const success: PositionCallback = ({
    coords: { latitude, longitude }
  }: GeolocationPosition) => {
    setCurrentLocation({ latitude, longitude });
  };

  const error: PositionErrorCallback = () => {
    setCurrentLocation({
      latitude: defaultLocation.DEFAULT_LATITUDE,
      longitude: defaultLocation.DEFAULT_LONGITUDE
    });
  };

  const options: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

  const getCurrentMapPosition = () => {
    navigator.geolocation.watchPosition(success, error, options);
  };

  return (
    <button type="button" onClick={getCurrentMapPosition}>
      내 위치
    </button>
  );
};

export default MyLocationButton;
