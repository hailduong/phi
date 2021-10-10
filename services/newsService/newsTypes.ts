export type TNewsDataResponse = {
    status: {
        code: number;
        message: string;
    }
    data: TNewsEntity[];
}

export type TNewsEntity = {
    id: number;
    title: string;
    content: string;
    fromDate: number;
    toDate: number;
}

export type TNewsCreateBody = Omit<TNewsEntity, 'id'>