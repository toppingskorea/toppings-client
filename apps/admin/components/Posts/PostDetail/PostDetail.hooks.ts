import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState
} from "react";
import { useToast } from "~/hooks";
import { useUpdatePublication } from "~/server/restaurant";

const useOnEventHandler = (id: number) => {
  const toast = useToast();
  const [rejectCause, setRejectCause] = useState("");

  const { verifyRejectCause, onChangeRejectCauseHandler } = useRejectCause({
    rejectCause,
    setRejectCause
  });

  const { mutate: updatePublicationMutate } = useUpdatePublication({
    onSuccess: () =>
      toast({
        title: "변경 성공",
        description: "실제 반영되었습니다.",
        status: "success"
      }),
    onError: () =>
      toast({
        title: "변경 실패",
        description: "개발자들에게 문의해봅시다",
        status: "error"
      })
  });
  const onApproveButtonClickHandler = () => {
    updatePublicationMutate({
      id,
      isPub: true
    });
  };

  const onRejectButtonClickHandler = () => {
    if (verifyRejectCause()) return;

    updatePublicationMutate({
      id,
      cause: rejectCause,
      isPub: false
    });
  };

  return {
    onApproveButtonClickHandler,
    onRejectButtonClickHandler,
    rejectCause,
    onChangeRejectCauseHandler
  };
};

const useRejectCause = ({
  rejectCause,
  setRejectCause
}: {
  rejectCause: string;
  setRejectCause: Dispatch<SetStateAction<string>>;
}) => {
  const toast = useToast();

  const verifyRejectCause = () => {
    if (!rejectCause) {
      toast({
        title: "변경 실패",
        description: "리젝 사유를 선택해주세요",
        status: "error"
      });

      return true;
    }

    return false;
  };

  const onChangeRejectCauseHandler = (event: ChangeEvent<HTMLSelectElement>) =>
    setRejectCause(event.currentTarget.value);

  return {
    verifyRejectCause,
    onChangeRejectCauseHandler
  };
};

export default useOnEventHandler;
