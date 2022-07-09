import { useQuery } from "@apollo/client";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useState } from "react";
import { AUTH_TOKEN } from "../constants/authToken";
import { CURRENT_USER } from "../queries/auth";
import { User } from "../types/user.type";

interface UserContextObject {
	user: User | null | undefined
	setUser: Dispatch<SetStateAction<User | null | undefined>>,
	token: string | null,
	setToken: (val: string | ((prevState: string | null) => string | null) | null) => void

}

export const UserContext = createContext<UserContextObject>(({ 
	user: undefined, 
	setUser: (user) => user, 
	token: null,
	setToken: (val) => void 0
}))

export default function UserContextProvider(props: PropsWithChildren<any>) {
	const [user, setUser] = useState<User | null | undefined>(undefined)
	const [token, setToken] = useLocalStorage<null | string>({ key: AUTH_TOKEN, defaultValue: null });

	const {data} = useQuery(CURRENT_USER)
	const value = useMemo(
		() => ({ user, setUser, token, setToken }),
		[user]
	)
	useEffect(() => {
		if (data) setUser(data.currentUser)
	}, [data, setUser])
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	)
}