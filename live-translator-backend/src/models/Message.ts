import mongoose, { Document, Schema } from 'mongoose';

import User, { IUser } from './User';

// Define the User schema
export interface IMessage extends Document {
    from: mongoose.Types.ObjectId
    to: mongoose.Types.ObjectId
    originalMessage: string
    translated: string
    createdAt: Date
}

const userSchema = new Schema<IMessage>({
    from: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    to: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    originalMessage: { type: String, required: true },
    translated: { type: String, required: true },
}, { timestamps: true });


const Message = mongoose.model<IMessage>('Message', userSchema);


export default Message;