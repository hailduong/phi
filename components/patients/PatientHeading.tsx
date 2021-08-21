import {TPatientEntity} from "../../services/patients/types";

type TPatient = {
    patientData1: TPatientEntity
}

const PatientHeading = (props: TPatient) => {

    const {patientData1} = props

    return <div className="m-b-md">
        <h2 className="patient-name">{patientData1.firstName}</h2>
    </div>
}

export default PatientHeading