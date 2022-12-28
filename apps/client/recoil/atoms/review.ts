import { atom, useRecoilValue, useSetRecoilState } from "recoil";

interface ReviewUploadAtomTypes {
  id?: Exclude<Restaurant.ReviewDTO, "id">["id"]; // id가 있다면 수정입니다.
}

const reviewUploadAtom = atom<ReviewUploadAtomTypes>({
  key: "reviewUploadAtom",
  default: {}
});

export const useReviewUploadValue = () => useRecoilValue(reviewUploadAtom);
export const useReviewUploadSetter = () => useSetRecoilState(reviewUploadAtom);
