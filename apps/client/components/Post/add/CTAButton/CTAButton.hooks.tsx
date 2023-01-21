import { useOverlay } from "@toss/use-overlay";
import { AlertModal } from "~/components/Common";
import type { DefaultPayload } from "~/server/post";

const useSubmitVerification = ({
  images,
  name,
  description,
  type
}: Partial<
  Pick<DefaultPayload, "images" | "name" | "description" | "type">
>) => {
  const overlay = useOverlay();

  const excuteCautionOverlay = (cautionMessage: string) =>
    overlay.open(({ exit }) => (
      <AlertModal information={cautionMessage} exitFn={exit} />
    ));

  const verificationSubmitInClient = () => {
    if (images?.length === 0) {
      excuteCautionOverlay(`It can't be uploaded\nwithout pictures`);
      return true;
    }

    if (!name) {
      excuteCautionOverlay(`It can't be uploaded\nwithout restaurant`);
      return true;
    }

    if (!description) {
      excuteCautionOverlay(`It can't be uploaded\nwithout description`);
      return true;
    }

    if (!type) {
      excuteCautionOverlay(`It can't be uploaded\nwithout category`);
      return true;
    }

    return false;
  };

  return {
    verificationSubmitInClient
  };
};

export default useSubmitVerification;
