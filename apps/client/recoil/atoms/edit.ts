import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
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
export const useEditReset = () => useResetRecoilState(editAtom);

// eatingHabit이 바뀌는지 체크합니다.
const profileEatingHabitChangedAtom = atom<boolean>({
  key: "profileEatingHabitChangedAtom",
  default: false
});

export const useProfileEatingHabitChangedValue = () =>
  useRecoilValue(profileEatingHabitChangedAtom);
export const useProfileEatingHabitChangedSetter = () =>
  useSetRecoilState(profileEatingHabitChangedAtom);
export const useProfileEatingHabitChangedReset = () =>
  useResetRecoilState(profileEatingHabitChangedAtom);
