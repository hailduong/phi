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
    descriptions: string;
    date: number;
}