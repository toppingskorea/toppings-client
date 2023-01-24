import { useMutation } from "@tanstack/react-query";
import { sendNotification } from "./apis";

export const useSendNotification = () => useMutation(sendNotification);
