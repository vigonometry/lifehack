import { useContext } from "react";
import { Button, Center, Stack, Title, Text } from "@mantine/core";
import { UserContext } from "../services/userContextProvider";
import { AUTH_TOKEN } from "../constants/authToken";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../queries/auth";
import AvailablePartners from "./AvailablePartners";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_ONLINE_USERS, TEST_SUB } from "../queries/users";

const HomePage = () => {
  const { user, setUser, setToken } = useContext(UserContext);
  console.log("User in home", user);
  const [logout, { data, loading, error }] = useMutation(LOGOUT_USER, {
    onCompleted: (data) => {
      console.log("Logout succ");
    },
    onError: (err) => {
      console.log("Logout err", err);
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
  
  const {  data:subData, loading:subLoad, error:subErr } = useSubscription(TEST_SUB, {
    onSubscriptionData:(options) => {
        console.log("Options ", options);
        const { subscriptionData } = options;
        console.log("Received sub data", subscriptionData);
    },
    onSubscriptionComplete() {
        console.log("Sub comp;")
    },
});

  return (
    <Stack>
      <Center>
          <Title>Welcome, {user?.username}</Title>
          <p>{JSON.stringify(subLoad)}</p>
        </Center>

        <Center>
          <Title order={2}>Online {user?.isClient ? "Counsellors" : "Clients"}:</Title>
        </Center>

        <AvailablePartners isClient={user?.isClient}/>

      
      <Button color="red" variant="light" onClick={handleLogOut}>
        Log Out
      </Button>
    </Stack>
  );
};

export default HomePage;
