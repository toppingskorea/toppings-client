import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { register } from "~/apis";

const useRegister = (options: Pick<UseQueryOptions, "onSuccess">) => {
  return useMutation(register, options);
};

export default useRegister;
