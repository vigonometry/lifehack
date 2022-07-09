import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { UserContext } from "./services/userContext";
import LoginPage from "./views/LoginPage";
import { Title } from "@mantine/core";

function App() {
  const { user } = useContext(UserContext);
  return <LoginPage />;
}

export default App;
