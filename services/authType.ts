export type TAuthRequestBody = {
    "password": string,
    "email": string
}

export type TAuthResponse = {
    status: {
        code: number
        message: string
    }
    data: {
        userId: number
        userEmail: string
        firstName: string
        lastName: string
        role: string
        accessToken: string
        refreshToken: string
    }
}