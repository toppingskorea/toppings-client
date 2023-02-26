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

const currentZoomLevelAtom = atom<number>({
  key: "currentZoomLevelAtom",
  default: 5
});

export const useCurrentZoomLevelAtomState = () =>
  useRecoilState(currentZoomLevelAtom);
export const useCurrentZoomLevelAtomValue = () =>
  useRecoilValue(currentZoomLevelAtom);
export const useCurrentZoomLevelAtomSetter = () =>
  useSetRecoilState(currentZoomLevelAtom);
