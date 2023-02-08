import { useToast } from "~/hooks";
import type { DefaultPayload } from "~/server/post";

const useSubmitVerification = ({
  images,
  name,
  description,
  type
}: Partial<
  Pick<DefaultPayload, "images" | "name" | "description" | "type">
>) => {
  const toast = useToast();

  const executeCautionOverlay = (cautionMessage: string) =>
    toast({
      title: "업로드 실패",
      description: cautionMessage,
      status: "error"
    });

  const verificationSubmitInClient = () => {
    if (images?.length === 0) {
      executeCautionOverlay(`It can't be uploaded\nwithout pictures`);
      return true;
    }

    if (!name) {
      executeCautionOverlay(`It can't be uploaded\nwithout restaurant`);
      return true;
    }

    if (!description) {
      executeCautionOverlay(`It can't be uploaded\nwithout description`);
      return true;
    }

    if (!type) {
      executeCautionOverlay(`It can't be uploaded\nwithout category`);
      return true;
    }

    return false;
  };

  return {
    verificationSubmitInClient
  };
};

export default useSubmitVerification;
