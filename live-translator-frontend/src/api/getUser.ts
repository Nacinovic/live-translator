import { parseResponse } from "./parseResponse";

export type User = {
    id: string,
    username: string,
    email: string,
    isOnline: boolean,
    language: string
}

async function getUsers(): Promise<User[]> {
    const url = `${process.env.REACT_APP_API_URL}/users`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    const users: User[] = await parseResponse(response)
    return users
}


export default getUsers