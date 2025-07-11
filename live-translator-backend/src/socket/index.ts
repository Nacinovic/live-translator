import { Server as HTTPServer } from 'http';
import { Server as SocketServer } from 'socket.io'

import socketAuth from './middlewares/socketAuth';
import onConnection from './socketEvents/onConnectionHandler';

let socketServer: SocketServer | null = null
const initializeSocketServer = (server: HTTPServer) => {

    socketServer = new SocketServer(server, {
        cors: {
            credentials: true,
            origin: process.env.CLIENT_URL,
        }
    })

    socketServer.use(socketAuth)

    onConnection(socketServer)
}
export default initializeSocketServer
