export type TAuthRequestBody = {
    'password': string,
    'email': string
}

export type TAuthResponse = {
    status: {
        code: number
        message: string
    }
    data: TUserEntity
}

export type TUserEntity = {
    userId: number
    userEmail: string
    firstName: string
    lastName: string
    role: string
    accessToken: string
    refreshToken: string
}