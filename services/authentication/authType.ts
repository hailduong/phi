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
    error?: number
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

export type TDoctorInfoResponse = {
    status: {
        code: number;
        message: string;
    }
    data: TDoctorInfoEntity;
}

export type TDoctorInfoEntity = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    address: string;
    title: string;
    phone: string;
    gender: string;
}