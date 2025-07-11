import { Socket, Server } from "socket.io"

import onMessageHandler from "./onMessageHandler"

export const activeSockets: { [key: string]: Socket[] | undefined } = {};

async function broadcastUserConnected(userId: string) {
    const filteredSockets = Object.fromEntries(
        Object.entries(activeSockets).filter(([key, value]) => key !== userId)
    );

    for (const [key, socketArray] of Object.entries(filteredSockets)) {
        if (socketArray) {
            socketArray.forEach((socket) => {
                socket.emit('userConnected', userId);
            });
        }
    }
}
async function broadcastUserDisconnected(userId: string) {
    const filteredSockets = Object.fromEntries(
        Object.entries(activeSockets).filter(([key, value]) => key !== userId)
    );

    for (const [key, socketArray] of Object.entries(filteredSockets)) {
        if (socketArray) {
            socketArray.forEach((socket) => {
                socket.emit('userDisconnected', userId);
            });
        }
    }
}

const connectedUsers = () => {
    return Object.keys(activeSockets).map((elem) => {
        return {
            userId: elem,
            connections: activeSockets[elem]?.length || 0
        }
    })
}

const onConnection = (server: Server) => {
    server.on('connection', (socket: Socket) => {
        const userId = socket.data.userId

        const userSockets = activeSockets[userId] ?? []
        userSockets.push(socket)
        activeSockets[socket.data.userId] = userSockets
        console.log(connectedUsers())
        broadcastUserConnected(userId)

        socket.on('disconnect', () => {
            const userId = socket.data.userId
            const userSockets = activeSockets[userId]?.filter((elem) => elem.id !== socket.id)
            if (!userSockets?.length) {
                delete activeSockets[socket.data.userId]
                broadcastUserDisconnected(userId)
            } else {
                activeSockets[userId] = userSockets
            }

        })


        onMessageHandler(socket)
    })
}

export default onConnection