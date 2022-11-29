import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const editAtom = atom<
  Partial<Pick<Profile.UserDTO, "country" | "habits" | "profile" | "name">>
>({
  key: "editAtom",
  default: {}
});

export default editAtom;

export const useEditState = () => useRecoilState(editAtom);
export const useEditValue = () => useRecoilValue(editAtom);
export const useEditSetter = () => useSetRecoilState(editAtom);
