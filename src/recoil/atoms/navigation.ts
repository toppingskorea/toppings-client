import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

// eslint-disable-next-line import/prefer-default-export
const navigationAtom = atom<{
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

export const useNavigation = () => useRecoilState(navigationAtom);
export const useNavigationValue = () => useRecoilValue(navigationAtom);
export const useNavigationSetter = () => useSetRecoilState(navigationAtom);
