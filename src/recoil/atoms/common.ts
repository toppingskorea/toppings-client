import { atom } from "recoil";

// 초기값 고양시청
const DEFAULT_LOCATION = {
  latitude: 37.65840919870283,
  longitude: 126.8320344602386
};

export const headerAtom = atom({
  key: "header",
  default: "Toppings"
});

export const currentLocationAtom = atom({
  key: "currentLocation",
  default: {
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude
  }
});
