import { NextFunction, Request, Response } from "express";
import { Router } from "express";

import { LoginUserParams, loginSchema } from "./bodySchema";

import User, { IUser } from "../../../models/User";
import signToken from "./signToken";
import { AuthError } from "../../../errors";

const route = Router()

const login = route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password }: LoginUserParams = await loginSchema.validate(req.body)
        const user = await User.findOne({
            $or: [
                { email: username },
                { username }
            ]
        })

        if (user === null) {
            throw new AuthError("Invalid username or password")
        }

        const isValidPassword = await user.comparePassword(password)

        if (!isValidPassword) {
            throw new AuthError("Invalid username or password")
        }

        const token = await signToken(user)
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 3600000,
            path: '/',
            sameSite: 'strict',
        });

        res.send("Cookie set")

    } catch (error) {
        next(error)
    }
})

export default login