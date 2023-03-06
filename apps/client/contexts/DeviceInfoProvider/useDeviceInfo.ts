import { useContext } from "react";
import { DeviceInfoContext, type DeviceInfoContextType } from ".";

export const useDeviceInfo = (): DeviceInfoContextType => {
  const { userAgent, isMobile, isIos, isAndroid } =
    useContext(DeviceInfoContext);

  return {
    userAgent,
    isMobile,
    isIos,
    isAndroid
  };
};
