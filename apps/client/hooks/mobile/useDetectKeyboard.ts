import { useEffect, useState } from "react";

// ? 현재 사용되고 있지 않습니다.
export const useDetectKeyboardOpen = (minKeyboardHeight = 300) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (!window.visualViewport) return;

      const newState =
        window.screen.height - minKeyboardHeight > window.visualViewport.height;
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState);
      }
    };
    if (typeof visualViewport !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", listener);
    }
    return () => {
      if (typeof visualViewport !== "undefined" && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", listener);
      }
    };
  }, [isKeyboardOpen, minKeyboardHeight]);

  return isKeyboardOpen;
};
