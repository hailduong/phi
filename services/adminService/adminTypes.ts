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
    role: string
    address: string
    title: string
    phone: number
    gender: string
    dob: string
}

export type TDoctorCreateBody = Omit<TDoctorEntity, 'id'>