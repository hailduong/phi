// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type TData = {
    name: string
    phoneNumber: string
    emergencyNumber: string
}[]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TData>
) {
    const data = [
        {
            name: "Pham Quoc Dung",
            phoneNumber: "123123",
            emergencyNumber: "456"
        },
        {
            name: "Nguyen Van B",
            phoneNumber: "123123123",
            emergencyNumber: "456"
        }
    ]
    res.status(200).json(data)
}
