import {NextApiRequest, NextApiResponse} from "next";
import {data} from "browserslist";

type TData = {
    status: string
    data: {
        id: number
        name: string
        descriptions: string
    }[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TData>
) {
    const data = {
        "status": "200",
        "data": [
            {
                "id": 1,
                "name": "Dị ứng với trứng",
                "descriptions": " + aaaaaaa /n + bbbbbbbbb"
            },
            {
                "id": 2,
                "name": "Dị ứng với đậu phộng",
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            },
            {
                "id": 3,
                "name": "Dị ứng với thuốc abc",
                "descriptions": " + Mổ tim /n + bbbbbbbbb"
            }
        ]
    }
    res.status(200).json(data)
}