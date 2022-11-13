import { atom } from "recoil";

// 초기값 고양시청
const DEFAULT_LOCATION = {
  latitude: 37.65840919870283,
  longitude: 126.8320344602386
};

// eslint-disable-next-line import/prefer-default-export
export const currentLocationAtom = atom({
  key: "currentLocationAtom",
  default: {
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude
  }
});
