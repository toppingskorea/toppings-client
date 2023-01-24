import { useState } from "react";
import { useToast } from "~/hooks";
import { useUpdatePublication } from "~/server/restaurant";

export const useOnClickButtonHandler = (id: number) => {
  const toast = useToast();
  const { rejectCause, verifyRejectCause } = useRejectCause();

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
    rejectCause
  };
};

export const useRejectCause = () => {
  const toast = useToast();
  const [rejectCause, setRejectCause] = useState("");

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

  return {
    rejectCause,
    setRejectCause,
    verifyRejectCause
  };
};
