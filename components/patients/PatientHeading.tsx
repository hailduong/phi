import {TPatientEntity} from "../../services/patients/types";

type TPatient = {
    patientName?: string
}

const PatientHeading = (props: TPatient) => {

    const {patientName = ''} = props

    return <div className="m-b-md">
        <h2 className="patient-name">{patientName}</h2>
    </div>
}

export default PatientHeading