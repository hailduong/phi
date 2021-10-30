export type TDoctorResponse = {
    status: {
        code: number
        message: string
    },
    data: TDoctorEntity[]
}

export type TDoctorEntity = {
    id: number
    firstName: string
    lastName: string
    email: string
    title: string
    phone: string
    gender: string
    password: string
}

export type TDoctorCreateBody = Omit<TDoctorEntity, 'id'>