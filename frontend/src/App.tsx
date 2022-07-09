import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { UserContext } from "./services/userContextProvider";
import LoginPage from "./views/LoginPage";
import { Button, Stack, Title } from "@mantine/core";
import { AUTH_TOKEN } from "./constants/authToken";

function App() {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    console.log(user);
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN);
    window.location.reload();
  };
  if (user === undefined) return <></>
  if (user === null) return <LoginPage />;
  return (
    <Stack>
      <Title>Yeeter Skeeter</Title>
      <Button color="red" variant="light" onClick={handleLogOut}>
        Log Out
      </Button>
    </Stack>
  );
}

export default App;
