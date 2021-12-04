import {useEffect, useState} from 'react'
import EmergencyItem from './EmergencyItem'
import {useRouter} from 'next/router'
import emergencyService from "../../../services/emergencyService/emergencyService";
import patientService from "../../../services/patients/patientService";
import {TEmergency} from "../../../services/patients/types";

const Emergency = () => {
    const router = useRouter()
    const {patientId = ''} = router.query

    const [shouldShowError, setShouldShowError] = useState(false)

    const [emergencyData, setEmergencyData] = useState<TEmergency[]>([])
    const getData = async () => {
        const statusCode = await patientService.getPatientInfo(patientId as string)
        if (statusCode.status.code === 200) {
            const data = await emergencyService.getEmergency(patientId as string)
            data && setEmergencyData(data)
        } else if (statusCode?.error === 400) {
            setShouldShowError(true)
            setTimeout(()=>{
                setShouldShowError(false)
            },5000)
        }
    }

    const handleDeleteEmergency = async (emergencyId: number) => {
        const response = await emergencyService.deleteEmergency(patientId as string, emergencyId)
        if (response.status.code === 200) {
            await getData()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('emergencyAdded', () => {
                getData()
            })
            window.addEventListener('emergencyEdited', () => {
                getData()
            })
        }
    }, [])


    const emergencyList = emergencyData.map(emergency => <EmergencyItem onDeleteEmergency={handleDeleteEmergency}
                                                                        key={emergency.id} emergencyData={emergency}/>)
    return (
        <div className="tab-pane active show" id="tab-4">
            {emergencyData.length !== 0 ? <div className="feed-activity-list">
                <div>{emergencyList}</div>
            </div> : <div className="text-center">There is no emergency.</div>}
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Data error.
                </div>
            </div>}
        </div>
    )
}

export default Emergency