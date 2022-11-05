import { atom } from "recoil";

// eslint-disable-next-line import/prefer-default-export
export const eventListAtom = atom({
  key: "eventListAtom",
  default: ["축구", "농구", "야구"]
});
