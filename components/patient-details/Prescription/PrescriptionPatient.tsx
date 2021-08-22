import {useEffect, useState} from "react";
import PrescriptionItem from "./PrescriptionItem";
import {API_URL} from "../../../env";
import {useRouter} from 'next/router'
import eventService from '../../../services/eventService/eventService'
import {TPrescriptionEntity} from '../../../services/prescriptionService/prescriptionTypes'
import prescriptionService from '../../../services/prescriptionService/prescriptionService'

export type TPresData = {
    id: number
    name: string
    date: number
    descriptions: string
}

type TPres = TPresData[]

const PrescriptionPatient = () => {

    const router = useRouter()
    const {patientId = ''} = router.query
    const [presData, setPresData] = useState<TPrescriptionEntity[]>([])
    useEffect(() => {
        const getData = async () => {
            const data = await prescriptionService.getAllPrescriptions(patientId as string)
            if (data?.status.code === 200) {
                setPresData(data.data)
            }
        }
        getData()
    }, [patientId])

    const presList = presData.map(pres => <PrescriptionItem presData={pres} key={pres.id}/>)
    return <div>{presList}</div>
}

export default PrescriptionPatient