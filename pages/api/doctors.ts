// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type TData = {
    status: string
    data: {
        "id": number
        "fullname": string
        "phone": string
        "descriptions": string
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
                "fullname": "Bruce 1",
                "phone": "09090909090",
                "descriptions": "bs 1"
            },
            {
                "id": 2,
                "fullname": "Bruce 2",
                "phone": "09090909090",
                "descriptions": "bs 2"
            }
        ]
    }
    res.status(200).json(data)
}
