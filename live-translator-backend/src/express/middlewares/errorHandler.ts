import { NextFunction, Request, Response, } from 'express'

import { CustomError } from '../../errors'

const errorHandler = async (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500
    const message = error.message ?? "Server error"

    console.log(error)
    res.status(status).json({ error: message })
}

export default errorHandler