import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";
import { defaultLocation } from "~/constants";

const currentLocationAtom = atom<Common.Coordinate>({
  key: "currentLocationAtom",
  default: {
    latitude: defaultLocation.DEFAULT_LATITUDE,
    longitude: defaultLocation.DEFAULT_LONGITUDE
  }
});

export const useCurrentLocationState = () =>
  useRecoilState(currentLocationAtom);
export const useCurrentLocationSetter = () =>
  useSetRecoilState(currentLocationAtom);
export const useCurrentLocationValue = () =>
  useRecoilValue(currentLocationAtom);
export const useCurrentLocationReset = () =>
  useResetRecoilState(currentLocationAtom);
