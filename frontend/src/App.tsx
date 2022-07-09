import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { UserContext } from "./services/userContext";
import LoginPage from "./views/LoginPage";
import { Title } from "@mantine/core";
import { useQuery, gql, useSubscription } from '@apollo/client';
import { User } from './types/user.type';
import { useState } from 'react';

const READ_CLIENTS = gql`
  query ReadClients {
    readClients {
      username
    }
  } 
`

function Subscription() {
  const TEST_SUBSCRIPTION = gql`
    subscription ClientRead {
    clientRead {
      text
    }
  }
  `;

  //const [test, setTest] = useState([]);
  const { data, loading } = useSubscription(TEST_SUBSCRIPTION, {
    onSubscriptionData(options) {
        const { subscriptionData } = options;
        console.log("New data:", subscriptionData);
    },
  });

  return (
    <div>
      <p>Data:{data}</p> 
    </div>
  )


}

function App() {
  const { user } = useContext(UserContext);
  return <LoginPage />;
}

export default App;
