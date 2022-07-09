import { useQuery } from "@apollo/client";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useState } from "react";
import { CURRENT_USER } from "../queries/auth";
import { User } from "../types/user.type";

interface UserContextObject {
	user: User | null | undefined
	setUser: Dispatch<SetStateAction<User | null | undefined>>
}

export const UserContext = createContext<UserContextObject>(({ user: undefined, setUser: (user) => user}))

export default function UserContextProvider(props: PropsWithChildren) {
	const [user, setUser] = useState<User | null | undefined>(undefined)
	const {data} = useQuery(CURRENT_USER)
	const value = useMemo(
		() => ({ user, setUser }),
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