import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const currentPositionLoadingAtom = atom<boolean>({
  key: "currentPositionLoadingAtom",
  default: false
});

export const useCurrentPositionLoadingState = () =>
  useRecoilState(currentPositionLoadingAtom);
export const useCurrentPositionLoadingValue = () =>
  useRecoilValue(currentPositionLoadingAtom);
export const useCurrentPositionLoadingSetter = () =>
  useSetRecoilState(currentPositionLoadingAtom);
