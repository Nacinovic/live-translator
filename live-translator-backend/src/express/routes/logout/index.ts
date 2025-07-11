import { NextFunction, Request, Response } from "express";
import { Router } from "express";

const route = Router()

const logout = route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('authToken')
        res.status(200).send('Cookie removed')

    } catch (error) {
        next(error)
    }
})

export default logout