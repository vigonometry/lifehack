import { useContext } from "react";
import { Button, Center, Stack, Title, Text } from "@mantine/core";
import { UserContext } from "../services/userContextProvider";
import { AUTH_TOKEN } from "../constants/authToken";

const HomePage = () => {
  const { user, setUser, setToken } = useContext(UserContext);
  const handleLogOut = () => {
    console.log(user);
    setUser(null);
    setToken(null);
    //localStorage.removeItem(AUTH_TOKEN);
    //window.location.reload();
  };

  return (
    <Stack>
      <Center>
          <Title>Welcome, {user?.username}</Title>
        </Center>

        <Center>
          <Title order={2}>Online counsellors:</Title>
        </Center>

      
      <Button color="red" variant="light" onClick={handleLogOut}>
        Log Out
      </Button>
    </Stack>
  );
};

export default HomePage;
