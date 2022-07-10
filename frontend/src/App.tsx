import { useContext } from "react";
import "./App.css";
import { UserContext } from "./services/userContextProvider";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import { Title } from "@mantine/core";

function App() {
  const user = useContext(UserContext);

  //if (user === undefined) return <Title>Help</Title>;
  if (user?.token == null) return <LoginPage />;
  return <HomePage />;
}

export default App;
