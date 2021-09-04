import Link from 'next/link'
import {TPatientEntity} from '../../services/patients/types'
import {useState} from "react";
import EditPatient from "./EditPatient";

type TProps = {
    patientData: TPatientEntity
    onDeletePatient: (id: number) => void
}

const PatientItem = (props: TProps) => {

    const {patientData, onDeletePatient} = props

    const [showEditPatient, setShowEditPatient] = useState(false)
    const handleEditPatient = () => {
        setShowEditPatient(!showEditPatient)
    }

    // const handleEditedPatient = () => {
    //     getData()
    //     setShowEditPatient(false)
    // }


    return (
        <div className="grid-container ibox-content">
            <div className="project-title">
                <Link href={`/patient-details/${patientData.id}`}>
                    <a>{patientData.firstName} {patientData.lastName}
                        <br/>
                        <small>Gender: {patientData.gender} | Phone: {patientData.phone} | Email: {patientData.email} </small>
                    </a>
                </Link>
            </div>
            <div className="project-actions">
                {/*<Link href={`/patient-details/${patientData.id}`}>*/}
                <a onClick={handleEditPatient} className="btn btn-white btn-sm">
                    <i className="fa fa-pencil"/> {showEditPatient ? 'Cancel' : 'Edit'}
                </a>
                {/*</Link>*/}
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeletePatient(patientData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>
            </div>
            <div className="edit-patient">
                {showEditPatient ? <EditPatient/> : null}
            </div>
        </div>

    )
}

export default PatientItem
