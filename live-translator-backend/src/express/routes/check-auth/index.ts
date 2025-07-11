import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import User from "../../../models/User";
import { ServerError } from "../../../errors";


const route = Router()

const checkAuth = route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.context.userId)
        if (!user) {
            throw new ServerError("User not found", 404)
        }

        res.status(200).json(user.toJSON())

    } catch (error) {
        next(error)
    }
})

export default checkAuth