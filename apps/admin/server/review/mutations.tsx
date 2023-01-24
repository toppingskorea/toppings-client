import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updatePublication } from "./apis";

// eslint-disable-next-line import/prefer-default-export
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
