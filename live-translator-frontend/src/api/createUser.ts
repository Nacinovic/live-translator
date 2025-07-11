import { parseResponse } from "./parseResponse";

export type CreateUserPayload = {
    email: string,
    password: string,
    username: string,
    language: string,
}

async function createUser(payload: CreateUserPayload) {
    const url = `${process.env.REACT_APP_API_URL}/users`
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    await parseResponse<void>(response)


}


export default createUser