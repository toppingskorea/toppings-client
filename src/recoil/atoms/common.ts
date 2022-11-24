import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { defaultLocation } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
const currentLocationAtom = atom({
  key: "currentLocationAtom",
  default: {
    latitude: defaultLocation.DEFAULT_LATITUDE,
    longitude: defaultLocation.DEFAULT_LONGITUDE
  }
});

// eslint-disable-next-line import/prefer-default-export
export const useCurrentLocationSetter = () =>
  useSetRecoilState(currentLocationAtom);
export const useCurrentLocationValue = () =>
  useRecoilValue(currentLocationAtom);
