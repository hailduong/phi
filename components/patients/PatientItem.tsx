import Link from 'next/link'
import {TPatientEntity} from '../../services/patients/types'

type TProps = {
    patientData: TPatientEntity
    onDeletePatient: (id: number) => void
}

const PatientItem = (props: TProps) => {

    const {patientData, onDeletePatient} = props


    return <tr>
        {/*<td className="project-status">*/}
        {/*    <span className="label label-primary"/>*/}
        {/*</td>*/}
        <td className="project-title">
            <Link href={`/patient-details/${patientData.id}`}>
                <a>{patientData.firstName} {patientData.lastName}
                    <br/>
                    <small>Phone: {patientData.phone} | Email: {patientData.email} </small>
                </a>
            </Link>
        </td>
        <td className="project-actions">
            <Link href={`/patient-details/${patientData.id}`}>
                <a className="btn btn-white btn-sm disabled">
                    <i className="fa fa-pencil"/> Edit
                </a>
            </Link>

            <a className="btn btn-white btn-sm ml-2" onClick={() => {
                onDeletePatient(patientData.id)
            }}>
                <i className="fa fa-trash"/>
            </a>
        </td>
    </tr>
}

export default PatientItem
