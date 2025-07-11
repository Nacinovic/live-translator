import { Socket } from "socket.io";
import { activeSockets } from "./onConnectionHandler";

import User from "../../models/User";
import Message from "../../models/Message";
import translateMessage from "../../utils/openAI";

type Message = {
    to: string;
    from: string;
    message: string;
};

const onMessageHandler = (socket: Socket) => {
    socket.on('message', async (message: Message) => {
        console.log("message:", message)

        const recipient = await User.findById(message.to)

        if (!recipient) {
            return 
        }

        const translated = await translateMessage(message.message, recipient.language) ?? "error"
        const messageToSave = new Message({
            from: message.from,
            to: message.to,
            originalMessage: message.message,
            translated
        })

        await messageToSave.save()

        console.log(translated, "this message was processed by chatGTP")
        message.message = translated

        const sockets = activeSockets[message.to] ?? []
        sockets.forEach((socket) => {
            console.log("Emitting to", message.to)
            socket.emit("message", JSON.stringify(message))
        })
    })
}


export default onMessageHandler