import s from './index.module.scss'

type TPatient = {
    patientName?: string
    emailPatient?: string
}

const PatientHeading = (props: TPatient) => {

    const {patientName = '', emailPatient = ''} = props

    return <div className="m-b-xs">
        <h2 className={s.patientName}>{patientName}</h2>
        <div>{emailPatient}</div>
    </div>
}

export default PatientHeading