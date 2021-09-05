import DoctorItem from './DoctorItem'
import {useEffect, useState} from 'react'
import {API_URL} from '../../../env'

export type TDoctorData = {
    id: string
    fullname: string
    phone: string
    descriptions: string
}

type TDoctor = TDoctorData[]

const DoctorPatient = () => {

    const [doctorData, setDoctorData] = useState<TDoctor>([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/auth/v1/docters/docters`)

            const data = await response.json()
            if (data.status === '200') {
                setDoctorData(data.data)
            }
        }

        getData()
    }, [])

    const doctorList = doctorData.map(doctor => <DoctorItem key={doctor.id} doctorData={doctor}/>)
    return (
        <div className="tab-pane active show"
             id="tab-2">
            <div className="feed-activity-list">
                <div>{doctorList}</div>
            </div>
        </div>
    )
}

export default DoctorPatient