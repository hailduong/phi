import {TPatientData} from "../../services/types";

type TPatient = {
    patientData1: TPatientData
}

const PatientHeading = (props: TPatient) => {

    const {patientData1} = props

    return <div className="m-b-md">
        <h2 className="patient-name">{patientData1.fisrtName}</h2>
    </div>
}

export default PatientHeading