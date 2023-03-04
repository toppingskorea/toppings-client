import { useMutation } from "@tanstack/react-query";
import { sendNotification } from ".";

export const useSendNotification = () => useMutation(sendNotification);
