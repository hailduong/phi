import {NextApiRequest, NextApiResponse} from "next";

type TData = {
    status: number
    data: {
        id: number
        name: string
        date: number
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
                "name": "Diabetic Retina Exam",
                "date": 1623945962,
                "descriptions": "Applicable Population: All 18-75 years /n + Frequency: Yearly"
            },
            {
                "id": 2,
                "name": "Medication List & Review",
                "date": 1623955962,
                "descriptions": "Applicable Population: All ≥ 66 years /n + Frequency: Yearly"
            },
            {
                "id": 3,
                "name": "Medication Adherence for Diabetes Medications (OAD)",
                "date": 1623955962,
                "descriptions": "Applicable Population: All ≥ 18 years /n + Frequency: Yearly"
            },
            {
                "id": 4,
                "name": "Chronic Pain Screening",
                "date": 1623955962,
                "descriptions": "Applicable Population: All ≥ 66 years /n + Frequency: Yearly"
            }
        ]
    }
    res.status(200).json(data)
}