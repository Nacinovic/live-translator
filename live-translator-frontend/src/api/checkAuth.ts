import { parseResponse } from "./parseResponse";

async function checkAuth() {
    const url = `${process.env.REACT_APP_API_URL}/check-auth`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    const userData: { username: string, id: string } = await parseResponse(response)
    return userData
}


export default checkAuth