import { selector } from "recoil";
import { headerAtom } from "../atoms/common";

// eslint-disable-next-line import/prefer-default-export
export const withHeader = selector({
  key: "withHeader",
  get: ({ get }) => {
    const text = get(headerAtom);

    return `${text}는 사랑이다.`;
  },
  set: ({ set }, newValue) => {
    set(headerAtom, newValue);
  }
});
