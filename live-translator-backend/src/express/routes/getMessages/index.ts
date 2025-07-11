import { NextFunction, Request, Response } from "express";
import { Router } from "express";

import Message, { IMessage } from "../../../models/Message";
import { querySchema } from "./querySchema";
import mongoose, { Mongoose } from "mongoose";

const route = Router()

const toObjectId = (value: string) => {
    return new mongoose.Types.ObjectId(value)
}

function buildWhereCondition(senderId: string | null | undefined, recipientId: string | undefined) {
    if (recipientId && senderId) {
        return {
            $or: [
                { from: toObjectId(senderId), to: toObjectId(recipientId) },
                { from: toObjectId(recipientId), to: toObjectId(senderId) }]
        }
    } else {
        return {}
    }
}

const getMessages = route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { context: { userId } } = req
        const { recipientId } = await querySchema.validate(req.query)

        let whereCondition = buildWhereCondition(userId, recipientId)
        let messages = await Message.find(whereCondition)
            .sort({ createdAt: 1 })


        const formatted = messages.reduce<{
            from: string
            to: string
            message: string
        }[]>((acc, value) => {
            acc.push({
                from: value.from.toString(),
                to: value.to.toString(),
                message: value.from.toString() === userId ? value.originalMessage : value.translated
            })
            return acc
        }, [])

        res.status(200).json(formatted)
    } catch (error) {
        next(error)
    }
})

export default getMessages