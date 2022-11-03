import { selector } from "recoil";
import { textState } from "../atoms/common";

// eslint-disable-next-line import/prefer-default-export
export const textLengthState = selector({
  key: "textLengthState",
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  }
});
