import { Button } from "@chakra-ui/react";
import { useInternalRouter } from "~/hooks";

const Main = () => {
  const { push } = useInternalRouter();
  return (
    <div>
      <Button onClick={() => push("/login")}>로그인 하러 가기</Button>
    </div>
  );
};

export default Main;
