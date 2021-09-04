export type TAllergyResponse = {
    status: {
        code: number;
        message: string;
    };
    total: number;
    data: TAllergyEntity[];
}

export type TAllergyEntity = {
    id: number;
    name: string;
    descriptions: string;
    date: number
}

export type TAllergyCreateBody = Omit<TAllergyEntity, 'id'>