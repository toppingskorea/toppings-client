import type { CSSProperties, ReactNode } from "react";

export type Props = {
  center?: Common.Coordinate;
  level?: number;
  minLevel?: number;
  maxLevel?: number;
  draggable?: boolean;
  zoomable?: boolean;
  onClick?: Map.WithMouseEvent;
  onDragStart?: Map.WithMouseEvent;
  onDragEnd?: Map.WithMouseEvent;
  onZoomChanged?: Map.Event;
  onTilesloaded?: Map.Event;
  onLoaded?: Map.Event;
  onBoundChange?: Map.Event;
  style?: CSSProperties;
  children?: ReactNode;
};
