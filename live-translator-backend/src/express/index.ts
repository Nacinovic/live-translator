import express from 'express'
import cors from 'cors'

import expressAuth from './middlewares/auth';
import errorHandler from './middlewares/errorHandler';

import createUser from './routes/createUser';
import login from './routes/login';
import logout from './routes/logout';
import getUsers from './routes/getUsers'
import getMessages from './routes/getMessages'
import checkAuth from './routes/check-auth';

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(express.json())

enum ROUTES {
    CHECK_AUTH = '/check-auth',
    MESSAGES = '/messages',
    USER = '/users',
    LOGIN = '/login',
    LOGOUT = '/logout',
    LANGUAGES = '/languages'
}

//USER
app.use(ROUTES.USER, createUser)
app.use(ROUTES.USER, expressAuth, getUsers)
app.use(ROUTES.MESSAGES, expressAuth, getMessages)

//LOGIN
app.use(ROUTES.LOGIN, login)
app.use(ROUTES.LOGOUT, logout)

//CHECK_AUTH
app.use(ROUTES.CHECK_AUTH, expressAuth, checkAuth)


app.use(errorHandler)

export default app
