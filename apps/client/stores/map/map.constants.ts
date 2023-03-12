import { defaultLocation } from "~/constants";

export const currentLocationInitialize: Common.Coordinate = {
  latitude: defaultLocation.DEFAULT_LATITUDE,
  longitude: defaultLocation.DEFAULT_LONGITUDE
};

export const fixedCurrentLocationInitialize: Common.Coordinate = {
  latitude: 0,
  longitude: 0
};
