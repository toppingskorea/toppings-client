import { useMutation } from "@tanstack/react-query";
import { register } from "~/apis";

const useRegister = () => {
  return useMutation(register);
};

export default useRegister;
