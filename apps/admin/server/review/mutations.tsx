import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updatePublication } from "./apis";

export const useUpdatePublication = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof updatePublication>>,
      unknown,
      Parameters<typeof updatePublication>[0]
    >,
    "onSuccess" | "onError"
  >
) => useMutation(updatePublication, options);
