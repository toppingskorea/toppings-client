import { atom } from "recoil";

// eslint-disable-next-line import/prefer-default-export
export const navigationAtom = atom<{
  top?: {
    title?: string;
    right?: JSX.Element;
  };
  bottom?: boolean;
}>({
  key: "navigationAtom",
  default: {
    bottom: true
  }
});
