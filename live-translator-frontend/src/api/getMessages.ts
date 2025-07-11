import { parseResponse } from "./parseResponse"

export type Message = {
    from: string
    to: string
    message: string
}


async function getMessages(recipientId: string): Promise<Message[]> {
    const url = `${process.env.REACT_APP_API_URL}/messages?recipientId=${recipientId}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    const messages: Message[] = await parseResponse(response)

    return messages
}


export default getMessages