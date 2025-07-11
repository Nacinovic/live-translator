import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

import { AuthError, ServerError } from '../errors';

const validateToken = (token: string): string => {
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
        throw new ServerError("ENV VARIABLE MISSING")
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId
}

const authenticateCookie = async (cookie: string | undefined) => {
    if (!cookie) {
        throw new AuthError("Missing auth token")
    }

    const authToken = parse(cookie).authToken

    if (!authToken) {
        throw new AuthError("Auth token invalid")
    }

    return validateToken(authToken)

}
export default authenticateCookie