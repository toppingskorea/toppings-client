export interface MapInitialState {
  currentLocation: Common.Coordinate;
  fixedCurrentLocation: Common.Coordinate;
  currentLocationLoading: boolean;
  currentZoomLevel: number;
}

export interface MapState extends MapInitialState {
  dispatchCurrentLocation: (
    coordinate: MapInitialState["currentLocation"]
  ) => void;
  dispatchCurrentLocationReset: VoidFunction;
  dispatchFixedCurrentLocation: (
    coordinate: MapInitialState["fixedCurrentLocation"]
  ) => void;
  dispatchCurrentLocationLoading: (
    value: MapInitialState["currentLocationLoading"]
  ) => void;
  dispatchCurrentZoomLevel: (
    value: MapInitialState["currentZoomLevel"]
  ) => void;
}
