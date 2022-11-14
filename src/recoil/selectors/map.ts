import { selector } from "recoil";
import { mapBoundsAtom } from "../atoms/map";

// eslint-disable-next-line import/prefer-default-export
export const withMapBounds = selector({
  key: "withMapBounds",
  get: ({ get }) => {
    return get(mapBoundsAtom);
  },
  set: ({ set }, newBounds) => {
    set(mapBoundsAtom, newBounds);
  }
});
