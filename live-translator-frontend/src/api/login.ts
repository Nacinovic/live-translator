import { parseResponse } from "./parseResponse";

async function login(loginParams: { username: string, password: string }): Promise<string> {
    const url = `${process.env.REACT_APP_API_URL}/login`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: loginParams.username,
            password: loginParams.password,
        }),
        credentials: 'include',
    });

    const token: string = await parseResponse(response)
    return token

}


export default login