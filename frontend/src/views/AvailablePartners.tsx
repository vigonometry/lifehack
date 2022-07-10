import { useQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { GET_ONLINE_USERS, SUBSCRIBE_ONLINE_USERS } from '../queries/users';
import { UserContext } from '../services/userContextProvider';
import { User } from '../types/user.type';

type PropType = {
    isClient:any
}

type getOnlineUsers = {
    getOnlineUsers: User[]
}

type SubscriptionData = {
    data:getOnlineUsers
}
export default function AvailablePartners(props: PropType) {
    // const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    console.log("props iscleitn", props.isClient)

    const setPartners = (data:any) => {
        console.log("B4 filter isClient", props.isClient);
        const after = data.filter((obj:any) => obj.isClient != props.isClient)
        console.log("After filter", after);
        setData(after);
    }

    const { loading, error, data: dataFromQuery } = useQuery<any>(GET_ONLINE_USERS, {
        fetchPolicy: 'no-cache',
        onCompleted:(data) => {
            console.log("Get online", data);
            setPartners(data.onlineUsers);
        },
        onError: (error) => {
            console.log("Get online err", error);
        }
    });

    const {   } = useSubscription<SubscriptionData>(SUBSCRIBE_ONLINE_USERS, {
        onSubscriptionData:(options) => {
            console.log("Options ")
            const { subscriptionData } = options;
            // @ts-ignore
            console.log("Received sub data", subscriptionData.data.getOnlineUsers);
            // @ts-ignore
            if (subscriptionData?.data?.getOnlineUsers == undefined) return;
            // @ts-ignore
            setPartners(subscriptionData.data.getOnlineUsers);
        }
    });

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error);
        return <p>Error</p>
    }

    if (data == undefined) return <p>Rip</p>

    return (
        <ul>
            { data.map((obj:any, idx:number) => {
                 return <li key={idx}>{obj.username}</li> 
            }) }
        </ul>
    )

}