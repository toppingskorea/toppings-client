import { atom } from "recoil";
import { defaultLocation } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const currentLocationAtom = atom({
  key: "currentLocationAtom",
  default: {
    latitude: defaultLocation.DEFAULT_LATITUDE,
    longitude: defaultLocation.DEFAULT_LONGITUDE
  }
});
