import {useEffect, useState} from "react";
import PrescriptionItem from "./PrescriptionItem";
import {API_URL} from "../../../env";

export type TPresData = {
    id: number
    name: string
    date: number
    descriptions: string
}

type TPres = TPresData[]

const PrescriptionPatient = () => {
    const [presData, setPresData] = useState<TPres>([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/auth/v1/user/prescription`)
            const data = await response.json()
            if (data.status === '200') {
                setPresData(data.data)
            }
        }
        getData()
    }, [])

    const presList = presData.map(pres => <PrescriptionItem presData={pres} key={pres.id}/>)
    return <div>{presList}</div>
}

export default PrescriptionPatient