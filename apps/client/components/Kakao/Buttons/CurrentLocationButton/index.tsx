import { CurrentPlace } from "@svgs/map";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { useCurrentLocation } from "./CurrentLocationButton.hooks";
import { Button } from "./CurrentLocationButton.styles";

export const CurrentLocationButton = () => {
  const { getCurrentMapPosition } = useCurrentLocation();

  return (
    <Button
      type="button"
      onClick={getCurrentMapPosition}
      variants={defaultScaleChangeVariants}
      {...framerMocker}
    >
      <CurrentPlace />
    </Button>
  );
};
