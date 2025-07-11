import { ExtendedError, Socket } from 'socket.io'

import authenticateCookie from '../../utils/authenticate'


const socketAuth = async (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie
        const userId = await authenticateCookie(cookieHeader)
        socket.data.userId = userId
        console.log("setting user id to data property")
        return next()
    } catch (error) {
        console.error(error)
        return next(error as ExtendedError)
    }
}

export default socketAuth