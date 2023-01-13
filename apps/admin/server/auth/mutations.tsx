import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { login } from "./apis";

export const useLogin = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof login>>,
      unknown,
      Parameters<typeof login>[0]
    >,
    "onSuccess" | "onError"
  >
) => useMutation(login, options);
