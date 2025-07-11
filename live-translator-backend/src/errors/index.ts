
export interface CustomError extends Error {
    status?: number
}

class AuthError implements CustomError {
    name: string
    message: string
    status = 401

    constructor(message: string) {
        this.name = "Auth Error"
        this.message = message

    }
}

class ServerError implements CustomError {
    name: string
    message: string
    status = 500

    constructor(message: string, status?: number) {
        this.name = "Server Error"
        this.message = message
        this.status = status ?? 500
    }
}

export {
    AuthError,
    ServerError
}