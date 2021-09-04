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
    applicablePopulation: string;
    frequency: number
}

export type TPrescriptionCreateBody = Omit<TPrescriptionResponse, 'id'>