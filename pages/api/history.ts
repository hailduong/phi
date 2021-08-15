import {NextApiRequest, NextApiResponse} from "next";

type TData = {
    status: string
    data: {
        id: number
        name: string
        fromDate: number
        toDate: number
        descriptions: string
    }
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const data = {
        "status": "200",
        "data": [
            {
                "id": 1,
                "name": "Lịch sử bệnh án 1",
                "fromDate": 1592384762,
                "toDate": 1623945962,
                "descriptions": " + aaaaaaa /n + bbbbbbbbb"
            },
            {
                "id": 2,
                "name": "Lịch sử bệnh án 2",
                "fromDate": 1592384762,
                "toDate": 1623945962,
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            },
            {
                "id": 3,
                "name": "Lịch sử bệnh án 3",
                "fromDate": 1592384762,
                "toDate": 1623945962,
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            },
            {
                "id": 4,
                "name": "Lịch sử bệnh án 4",
                "fromDate": 1592384762,
                "toDate": 1623945962,
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            },
            {
                "id": 5,
                "name": "Lịch sử bệnh án 5",
                "fromDate": 1592384762,
                "toDate": 1623945962,
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            },
            {
                "id": 6,
                "name": "Lịch sử bệnh án 6",
                "fromDate": 1592384762,
                "toDate": 1623945962,
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            }
        ]
    }
    res.status(200).json(data)
}

