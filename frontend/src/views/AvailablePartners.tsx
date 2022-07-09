import { useQuery } from '@apollo/client';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { GET_ONLINE_USERS } from '../queries/users';
import { User } from '../types/user.type';

export default function AvailablePartners() {
    const { loading, error, data } = useQuery<any>(GET_ONLINE_USERS, {
        onCompleted:(data) => {
            console.log("Get online", data);
        },
        onError: (error) => {
            console.log("Get online err", error);
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
            { data.onlineUsers.map((obj:any, idx:number) => {
                 return <li key={idx}>{obj.username}</li> 
            }) }
        </ul>
    )

}