import { css } from "@emotion/react";
import { height100, width100 } from "@toss/emotion-utils";
import FilteringButton from "./Button/FilteringButton";
import MyLocationButton from "./Button/MyLocationButton";
import ViewStatusButton from "./Button/ViewStatusButton";
import { useMapEvent, useMapHook } from "./Map.hooks";

const Map = ({ children }: Util.PropsWithChild) => {
  const app = useMapHook();

  useMapEvent("dragend");
  useMapEvent("zoom_changed");

  return (
    <div
      ref={app.mapRef}
      css={css`
        ${width100}
        ${height100}
        z-index: ${app.zIndex.zero};
      `}
    >
      {children}
    </div>
  );
};

Map.MyLocationButton = MyLocationButton;
Map.FilteringButton = FilteringButton;
Map.ViewStatusButton = ViewStatusButton;

export default Map;
