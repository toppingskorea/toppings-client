/* eslint-disable import/prefer-default-export */
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { register } from "./apis";

export const useRegister = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof register>>,
      unknown,
      Parameters<typeof register>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(register, options);
};
