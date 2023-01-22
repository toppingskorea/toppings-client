import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const noticeActivateAtom = atom<boolean>({
  key: "noticeActivateAtom",
  default: false
});

export const useNoticeActivateState = () => useRecoilState(noticeActivateAtom);
export const useNoticeActivateValue = () => useRecoilValue(noticeActivateAtom);
export const useNoticeActivateSetter = () =>
  useSetRecoilState(noticeActivateAtom);
