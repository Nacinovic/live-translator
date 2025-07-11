import { NextFunction, Request, Response } from "express";
import { Router } from "express";

import { activeSockets } from "../../../socket/socketEvents/onConnectionHandler";

import User from "../../../models/User";

const route = Router()

const getUsers = route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { context: { userId } } = req
        const users = await User.find({ _id: { $ne: { _id: userId } } })
        const activeUsers = users.map((user) => ({ ...user.toJSON(), isOnline: Boolean(activeSockets[user._id]?.length) }))
        res.status(200).json(activeUsers)

    } catch (error) {
        next(error)
    }
})

export default getUsers