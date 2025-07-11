import { NextFunction, Request, Response } from "express";
import { Router } from "express";

import { CreateUserParams, createUserSchema } from "./bodySchema";

import User from "../../../models/User";

const route = Router()

const signup = route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createUserParams: CreateUserParams = await createUserSchema.validate(req.body)
        const user = new User(createUserParams)
        await user.save()
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

export default signup