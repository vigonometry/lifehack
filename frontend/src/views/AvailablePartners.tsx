import { useQuery, useSubscription } from "@apollo/client";
import { Center, createStyles, Grid, SimpleGrid } from "@mantine/core";
import React from "react";
import { useContext, useState, useEffect } from "react";
import UserCard from "../components/user/UserCard";
import { GET_ONLINE_USERS, SUBSCRIBE_ONLINE_USERS } from "../queries/users";
import { UserContext } from "../services/userContextProvider";
import { User } from "../types/user.type";

type PropType = {
  isClient: any;
};

type getOnlineUsers = {
  getOnlineUsers: User[];
};

type SubscriptionData = {
  data: getOnlineUsers;
};

const useStyles = createStyles((theme) => ({
  grid: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "left",
    },
  },
}));

export default function AvailablePartners(props: PropType) {
  // const { user } = useContext(UserContext);
  const { classes } = useStyles();

  const [data, setData] = useState([]);

  const setPartners = (data: any) => {
    const after = data.filter((obj: any) => obj.isClient != props.isClient);
    setData(after);
  };

  const {
    loading,
    error,
    data: dataFromQuery,
  } = useQuery<any>(GET_ONLINE_USERS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log("Get online", data);
      setPartners(data.onlineUsers);
    },
    onError: (error) => {
      console.log("Get online err", error);
    },
  });

  const {} = useSubscription<SubscriptionData>(SUBSCRIBE_ONLINE_USERS, {
    onSubscriptionData: (options) => {
      console.log("Options ");
      const { subscriptionData } = options;
      // @ts-ignore
      console.log("Received sub data", subscriptionData.data.getOnlineUsers);
      // @ts-ignore
      if (subscriptionData?.data?.getOnlineUsers == undefined) return;
      // @ts-ignore
      setPartners(subscriptionData.data.getOnlineUsers);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  if (data == undefined) return <p>Rip</p>;

  return (
    <ul>
      {data.map((obj: any, idx: number) => {
        return (
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: 755, cols: 2, spacing: "lg" },
              { maxWidth: 600, cols: 1, spacing: "lg" },
            ]}
            spacing="lg"
            className={classes.grid}
          >
            <UserCard username={obj.username} />
          </SimpleGrid>
        );
      })}
    </ul>
  );
}
