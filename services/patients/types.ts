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
    gender: string;
}

export type TDeletePatientResponse = {
    status: {
        code: number;
        message: string;
    };
    data: [];
}