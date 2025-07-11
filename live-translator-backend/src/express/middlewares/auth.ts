import { NextFunction, Request, Response, } from 'express'

import authenticateCookie from '../../utils/authenticate'


const expressAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookieHeader = req.headers.cookie
        let userId = await authenticateCookie(cookieHeader)
        req.context = { userId }
        return next()
    } catch (error) {
        console.error(error)
        return next(error)
    }
}

export default expressAuth