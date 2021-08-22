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
}