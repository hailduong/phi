import s from './index.module.scss'

type TPatient = {
    patientName?: string
}

const PatientHeading = (props: TPatient) => {

    const {patientName = ''} = props

    return <div className="m-b-md">
        <h2 className={s.patientName}>{patientName}</h2>
    </div>
}

export default PatientHeading