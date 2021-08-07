type TProps = {
  name: string
  phoneNumber: string
  emergencyNumber: string
}

const PatientItem = (props: TProps) => {

    const {emergencyNumber, name, phoneNumber} = props

    return <tr>
        <td className="project-status">
            <span className="label label-primary"/>
        </td>
        <td className="project-title">
            <a href="project_detail.html">{name}</a>
            <br/>
            <small>Phone: {phoneNumber} | Emergency: {emergencyNumber}</small>
        </td>
        <td className="project-actions">
            <a href="#" className="btn btn-white btn-sm">
                <i className="fa fa-pencil"/> Edit
            </a>
        </td>
    </tr>
}

export default PatientItem
