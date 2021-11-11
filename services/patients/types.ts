/* Patients */

export type TPatientDataResponse = {
    status: {
        code: number;
        message: string;
    };
    data: TPatientEntity[];
    error?: number
}

export type TPatientInfoResponse = {
    status: {
        code: number;
        message: string;
    };
    data: TPatientEntity;
    error?: number
}

export type TPatientEntity = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    gender?: string;
    dateOfBirth: number;
    insurance?: string;
    medicalGroup?: string;
    healthPlan?: string
    emergencyContact?: TEmergency[]
}

export type TEmergency = {
    id: number;
    name: string;
    gender: string;
    phone: string;
    relationship: string
}

export type TPatientCreateBody = Omit<TPatientEntity, 'id'>

type TCreatePatientResponseSuccess = {
    status: {
        code: number;
        message: string;
    };
    data: [];
}

type TCreatePatientResponseFail = {
    code: number
    message: string
}

export type TCreatePatientResponse = TCreatePatientResponseSuccess | TCreatePatientResponseFail

export type TDeletePatientResponse = {
    status: {
        code: number;
        message: string;
    };
    data: [];
}