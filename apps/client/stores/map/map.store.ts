/* eslint-disable no-param-reassign */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { defaultCurrentLocation } from "./map.constants";
import type { MapInitialState, MapState } from "./map.types";

const initialState: MapInitialState = {
  currentLocation: defaultCurrentLocation,
  fixedCurrentLocation: {
    latitude: 0,
    longitude: 0
  },
  currentLocationLoading: false,
  currentZoomLevel: 5
};

export const useMapStore = create(
  immer<MapState>(set => ({
    ...initialState,
    dispatchCurrentLocation: coordinate =>
      set(state => {
        state.currentLocation = coordinate;
      }),
    dispatchCurrentLocationReset: () =>
      set(state => {
        state.currentLocation = defaultCurrentLocation;
      }),
    dispatchFixedCurrentLocation: coordinate =>
      set(state => {
        state.fixedCurrentLocation = coordinate;
      }),
    dispatchCurrentLocationLoading: value =>
      set(state => {
        state.currentLocationLoading = value;
      }),
    dispatchCurrentZoomLevel: value =>
      set(state => {
        state.currentZoomLevel = value;
      })
  }))
);
