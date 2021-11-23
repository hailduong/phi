import {useEffect, useState} from 'react'
import PrescriptionItem from './PrescriptionItem'
import {useRouter} from 'next/router'
import {TPrescriptionEntity} from '../../../services/prescriptionService/prescriptionTypes'
import prescriptionService from '../../../services/prescriptionService/prescriptionService'
import {Pagination} from "antd";
import {list} from "postcss";

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
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const getData = async (page: number) => {
        const data = await prescriptionService.getAllPrescriptions(patientId as string, page)
        if (data?.status.code === 200) {
            setPresData(data.data)
            setTotal(data.total)
        }
    }

    const handlePageChange = async (pageNo: number = page) => {
        await getData(pageNo)
        setPage(pageNo)
    }

    useEffect(() => {
        getData(page)
    }, [patientId])

    const handleDeletePrescription = async (prescriptionId: number) => {
        await prescriptionService.deletePrescription(patientId as string, prescriptionId)
        getData(page)
    }

    useEffect(() => {
        if (window !== 'undefined') {
            window.addEventListener('prescriptionAdded', () => {
                getData(page)
            })
            window.addEventListener('prescriptionEdited', () => {
                getData(page)
            })
        }
    })

    const presList = presData.map(pres => <PrescriptionItem onDeletePrescription={handleDeletePrescription}
                                                            presData={pres} key={pres.id}/>)
    return (
        <div className="tab-pane active show" id="tab-5">
            {presData.length !== 0 ? <div className="feed-activity-list">
                {presList}
                <div className="text-center mt-3">
                    <Pagination onChange={handlePageChange} total={total}/>
                </div>
            </div> : <div className="feed-activity-list text-center">There is no prescription.</div>}

        </div>
    )
}

export default PrescriptionPatient