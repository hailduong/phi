import Link from "next/link";
import {TPatientData} from "../../services/types";

type TProps = {
    patientData: TPatientData
}

const PatientItem = (props: TProps) => {

    const {patientData} = props

    return <tr>
        {/*<td className="project-status">*/}
        {/*    <span className="label label-primary"/>*/}
        {/*</td>*/}
        <td className="project-title">
            <div>{patientData.id}</div>
            <a href="project_detail.html">Title: {patientData.title} | {patientData.fisrtName} {patientData.lastName}</a>
            <br/>
            <small>Phone: {patientData.phone} | Email: {patientData.email} </small>
        </td>
        <td className="project-actions">
            <Link href={`/patient-details/${patientData.id}`}>
                <a className="btn btn-white btn-sm">
                    <i className="fa fa-pencil"/> Edit
                </a>
            </Link>
        </td>
    </tr>
}

export default PatientItem
