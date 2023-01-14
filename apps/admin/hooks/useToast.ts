import type { UseToastOptions } from "@chakra-ui/react";
import { useToast as _useToast } from "@chakra-ui/react";

const useToast = (options?: UseToastOptions) =>
  _useToast({
    ...options,
    duration: options?.duration || 3000,
    isClosable: options?.isClosable || true
  });

export default useToast;
