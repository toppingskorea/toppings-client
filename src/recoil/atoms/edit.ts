import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";
import { editSelector } from "../selector";

const editAtom = atom<Omit<Profile.UserDTO, "id">>({
  key: "editAtom",
  default: editSelector
});

export const useEditState = () => useRecoilState(editAtom);
export const useEditSetter = () => useSetRecoilState(editAtom);
export const useEditValue = () => useRecoilValue(editAtom);
