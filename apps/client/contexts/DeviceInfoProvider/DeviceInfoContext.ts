import { createContext } from "react";

export interface DeviceInfoContextType {
  userAgent: string;
  isMobile: boolean;
  isIos: boolean;
  isAndroid: boolean;
}

export const DeviceInfoContext = createContext<DeviceInfoContextType>({
  userAgent: "",
  isMobile: false,
  isIos: false,
  isAndroid: false
});
