/* eslint-disable no-param-reassign */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  currentLocationInitialize,
  fixedCurrentLocationInitialize
} from "./map.constants";
import type { MapInitialState, MapState } from "./map.types";

const initialState: MapInitialState = {
  currentLocation: currentLocationInitialize,
  fixedCurrentLocation: fixedCurrentLocationInitialize
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
        state.currentLocation = currentLocationInitialize;
      }),
    dispatchFixedCurrentLocation: coordinate =>
      set(state => {
        state.fixedCurrentLocation = coordinate;
      })
  }))
);
