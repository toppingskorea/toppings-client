export interface MapInitialState {
  currentLocation: Common.Coordinate;
  fixedCurrentLocation: Common.Coordinate;
}

export interface MapState extends MapInitialState {
  dispatchCurrentLocation: (coordinate: Common.Coordinate) => void;
  dispatchCurrentLocationReset: VoidFunction;
  dispatchFixedCurrentLocation: (coordinate: Common.Coordinate) => void;
}
