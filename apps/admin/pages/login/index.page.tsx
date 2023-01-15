import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from "@chakra-ui/react";
import useLoginPage from "./login.hooks";

const Login = () => {
  const app = useLoginPage();

  return (
    <Center>
      <Stack as="form" spacing={4} onSubmit={app.onSubmitHandler}>
        <InputGroup width="sm">
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="아이디를 입력해주세요" {...app.username} />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...app.password}
          />
        </InputGroup>

        <Button type="submit" colorScheme="blue">
          로그인
        </Button>
      </Stack>
    </Center>
  );
};

export default Login;
