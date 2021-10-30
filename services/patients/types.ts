/* Patients */

export type TPatientDataResponse = {
    status: {
        code: number;
        message: string;
    };
    data: TPatientEntity[];
}

export type TPatientEntity = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    title: string;
    phone: string;
    gender?: string;
    dateOfBirth: number;
    insurance?: string;
    medicalGroup?: string;
    healthPlan?: string
}

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