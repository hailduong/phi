export type TEmergencyResponse = {
    status: {
        code: number;
        message: string;
    };
    total: number;
    data: TEmergencyEntity[];
}

export type TEmergencyEntity = {
    id: number;
    name: string
    email: string
    address: string
    gender: string
    phone: string
    relationship: string
}

export type TEmergencyCreateBody = Omit<TEmergencyEntity, 'id'>