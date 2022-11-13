import { atom } from "recoil";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const currentLocationAtom = atom({
  key: "currentLocationAtom",
  default: {
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE
  }
});
