export type TPrescriptionResponse = {
    status: {
        code: number;
        message: string;
    };
    total: number;
    data: TPrescriptionEntity[];
}

export type TPrescriptionEntity = {
    id: number;
    name: string;
    date: number;
    descriptions: string;
}

export type TPrescriptionCreateBody = Omit<TPrescriptionEntity, 'id'>