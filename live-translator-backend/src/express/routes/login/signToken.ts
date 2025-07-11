import jwt from 'jsonwebtoken';

import { IUser } from '../../../models/User';

const signToken = async (user: IUser): Promise<string> => {
    const { JWT_SECRET } = process.env

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET as string,
        { expiresIn: '4d' }
    );

    return token
}

export default signToken