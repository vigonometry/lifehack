import { useContext } from "react";
import { Button, Stack, Title } from "@mantine/core";
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
      <Title>Yeeter Skeeter</Title>
      <Button color="red" variant="light" onClick={handleLogOut}>
        Log Out
      </Button>
    </Stack>
  );
};

export default HomePage;
