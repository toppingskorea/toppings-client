import { defaultLocation } from "~/constants";

// 서울의 경도, 위도
export const DEFAULT_INITIAL_CENTER = {
  latitude: defaultLocation.DEFAULT_LATITUDE,
  longitude: defaultLocation.DEFAULT_LONGITUDE
} as const;
