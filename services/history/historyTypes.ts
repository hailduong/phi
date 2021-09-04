export type THistoryResponse = {
    status: {
        code: number;
        message: string;
    }
    total: number;
    data: THistoryEntity[];
}

export type THistoryEntity = {
    id: number;
    name: string;
    descriptions: string;
    fromDate: number;
    toDate: number;
    applicablePopulation: string;
    frequency: number
}

export type THistoryCreateBody = Omit<THistoryEntity, 'id'>