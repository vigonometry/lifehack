import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { User } from './types/User';

const READ_CLIENTS = gql`
  query ReadClients {
    readClients {
      username
    }
  } 
`

function App() {
  const { loading, error, data } = useQuery(READ_CLIENTS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const success = () => {
    console.log(data);
    return (
      <div>
        { data.readClients.map((user:User, idx:React.Key) => <p key={idx}>{user.username}</p>) }

      </div>
    )
  }
  return (
    <>
    { success() }
    </>
  );
}

export default App;
