import { Container, Center } from "@mantine/core";
import LoginContainer from "../components/login/LoginContainer";

const LoginPage = () => {
  return (
    <Center>
      <Container p={20}>
        <LoginContainer />
      </Container>
    </Center>
  );
};

export default LoginPage;
