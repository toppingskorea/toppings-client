import type { CSSProperties, ReactNode } from "react";

export type Props = {
  onClick?: Map.WithMouseEvent;
  onDragStart?: Map.WithMouseEvent;
  onDragEnd?: Map.WithMouseEvent;
  onZoomChanged?: Map.Event;
  onTilesloaded?: Map.Event;
  style?: CSSProperties;
  children?: ReactNode;
};
