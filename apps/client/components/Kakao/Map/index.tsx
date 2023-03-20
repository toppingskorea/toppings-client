import { MapProvider } from "~/contexts";
import { Container } from "./Container";
import { DEFAULT_INITIAL_CENTER } from "./Map.constants";
import type { Props } from "./Map.types";

export const Map = ({
  center = DEFAULT_INITIAL_CENTER,
  level = 6,
  minLevel = 1,
  maxLevel = 8,
  draggable = true,
  zoomable = true,
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  onTilesloaded,
  style,
  onLoaded,
  onBoundChange,
  children
}: Props) => {
  return (
    <MapProvider
      center={center}
      level={level}
      minLevel={minLevel}
      maxLevel={maxLevel}
      onLoaded={onLoaded}
      onBoundChange={onBoundChange}
      draggable={draggable}
      zoomable={zoomable}
    >
      <Container
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onZoomChanged={onZoomChanged}
        onTilesloaded={onTilesloaded}
        style={style}
      >
        {children}
      </Container>
    </MapProvider>
  );
};
