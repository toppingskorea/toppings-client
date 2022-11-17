import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const navigationAtom = atom<{
  top?: {
    title?: JSX.Element;
    right?: JSX.Element;
    marginBottom?: Common.CSSPixelValue;
  };
  bottom?: boolean;
}>({
  key: "navigationAtom",
  default: {
    top: undefined,
    bottom: false
  }
});

export const useNavigation = () => useRecoilState(navigationAtom);
export const useNavigationValue = () => useRecoilValue(navigationAtom);
export const useNavigationSetter = () => useSetRecoilState(navigationAtom);
