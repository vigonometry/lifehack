import { Anchor, Center, Title, Space, Stack, Text } from "@mantine/core";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginContainer = () => {
  const [login, setLogin] = useState(true);

  const alternateOption = login ? (
    <Text align="center">
      Don't have an account?{" "}
      <Anchor onClick={() => setLogin(false)}>Create an Account</Anchor>
    </Text>
  ) : (
    <Text align="center">
      Already have an account?{" "}
      <Anchor onClick={() => setLogin(true)}>Log In</Anchor>
    </Text>
  );

  return (
    <Stack style={{ width: "85%", minWidth: 250, maxWidth: 450 }}>
      <Center>
        <Title>iMmoRTals</Title>
      </Center>
      <Space />
      {login ? <LoginForm /> : <RegisterForm />}
      <Space />
      {alternateOption}
    </Stack>
  );
};

export default LoginContainer;
