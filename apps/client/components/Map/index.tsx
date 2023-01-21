import { css } from "@emotion/react";
import { size } from "@toss/emotion-utils";
import { useMapHook } from "./Map.hooks";

const Map = ({ children }: Util.PropsWithChild) => {
  const app = useMapHook();

  // useMapEvent("dragend");
  // useMapEvent("zoom_changed");

  return (
    <div
      ref={app.mapRef}
      css={css`
        ${size.full}
        z-index: ${app.zIndex.zero};
      `}
    >
      {children}
    </div>
  );
};

export default Map;
