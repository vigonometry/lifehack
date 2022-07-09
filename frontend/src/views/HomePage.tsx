import { useContext } from "react";
import { Button, Center, Stack, Title, Text } from "@mantine/core";
import { UserContext } from "../services/userContextProvider";
import { AUTH_TOKEN } from "../constants/authToken";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../queries/auth";

const HomePage = () => {
  const { user, setUser, setToken } = useContext(UserContext);
  const [logout, { data, loading, error }] = useMutation(LOGOUT_USER, {
    onCompleted: (data) => {
      console.log("Logout succ");
    },
    onError: (err) => {
      console.log("Logout err");
    }
  })
  const handleLogOut = async() => {
    console.log(user);
    await logout({ variables: { id: user?._id} });
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
