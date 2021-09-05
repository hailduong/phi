import {useEffect, useState} from 'react'
import PrescriptionItem from './PrescriptionItem'
import {useRouter} from 'next/router'
import {TPrescriptionEntity} from '../../../services/prescriptionService/prescriptionTypes'
import prescriptionService from '../../../services/prescriptionService/prescriptionService'

export type TPresData = {
    id: number
    name: string
    date: number
    descriptions: string
}

const PrescriptionPatient = () => {

    const router = useRouter()
    const {patientId = ''} = router.query
    const [presData, setPresData] = useState<TPrescriptionEntity[]>([])

    const getData = async () => {
        const data = await prescriptionService.getAllPrescriptions(patientId as string)
        if (data?.status.code === 200) {
            setPresData(data.data)
        }
    }

    useEffect(() => {
        getData()
    }, [patientId])

    const handleDeletePrescription = async (prescriptionId: number) => {
        await prescriptionService.deletePrescription(patientId as string, prescriptionId)
        getData()
    }

    useEffect(() => {
        if (window !== 'undefined') {
            window.addEventListener('prescriptionAdded', () => {
                getData()
            })
            window.addEventListener('prescriptionEdited', () => {
                getData()
            })
        }
    })

    const presList = presData.map(pres => <PrescriptionItem onDeletePrescription={handleDeletePrescription}
                                                            presData={pres} key={pres.id}/>)
    return (
        <div className="tab-pane active show" id="tab-5">
            <div className="feed-activity-list">
                {presList}
            </div>
        </div>
    )
}

export default PrescriptionPatient