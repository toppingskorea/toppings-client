import { selector } from "recoil";
import { currentLocationAtom } from "../atoms/common";

// eslint-disable-next-line import/prefer-default-export
export const withCurrentLocation = selector({
  key: "withCurrentLocation",
  get: ({ get }) => {
    return get(currentLocationAtom);
  },
  set: ({ set }, newLocation) => {
    set(currentLocationAtom, newLocation);
  }
});
