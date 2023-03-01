import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from "@chakra-ui/react";
import { useLoginState, useLoginSubmit } from "./login.hooks";

const LoginPage = () => {
  const { username, password } = useLoginState();

  const { onSubmitHandler } = useLoginSubmit({
    username: username.value,
    password: password.value
  });

  return (
    <Center>
      <Stack as="form" spacing={4} onSubmit={onSubmitHandler}>
        <InputGroup width="sm">
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="아이디를 입력해주세요" {...username} />
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
            {...password}
          />
        </InputGroup>

        <Button type="submit" colorScheme="blue">
          로그인
        </Button>
      </Stack>
    </Center>
  );
};

export default LoginPage;
