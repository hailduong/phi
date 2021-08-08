type TPatient = {
    name: string
}

const PatientHeading = (props: TPatient) => {

    const {name} = props

    return <div className="m-b-md">
        <h2 className="patient-name">{name}</h2>
    </div>
}

export default PatientHeading