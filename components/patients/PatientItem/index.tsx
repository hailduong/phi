import Link from 'next/link'
import {TPatientEntity} from '../../../services/patients/types'
import {useState} from 'react'
import EditPatient from '../EditPatient'
import s from './index.module.scss'
import {Button, Popover, PopoverBody} from 'reactstrap'
import {useIsAdmin} from '../../common/SideBar'

type TProps = {
    patientData: TPatientEntity
    onDeletePatient: (id: number) => void
    doctorId?: string
}

const PatientItem = (props: TProps) => {

    const isAdmin = useIsAdmin()

    const {patientData, onDeletePatient, doctorId} = props

    const [showEditPatient, setShowEditPatient] = useState(false)
    const handleEditPatient = () => {
        setShowEditPatient(!showEditPatient)
    }

    const [popoverOpen, setPopoverOpen] = useState(false)
    console.log('popoverOpen', popoverOpen)

    const togglePopover = () => setPopoverOpen(!popoverOpen)

    const handleEdited = () => {
        setShowEditPatient(false)
    }
    const cancelEdit = () => {
        setShowEditPatient(false)
    }

    const patientDetailLink = (() => {
        if (doctorId) {
            return `/patient-details/${patientData.id}?doctorId=${doctorId}`
        }
        return `/patient-details/${patientData.id}`

    })()

    /* Render */
    return (
        <div className={`grid-container ibox-content ${s.patientItem}`}>
            <div className="project-title">
                <Link href={patientDetailLink}>
                    <a>{patientData.firstName} {patientData.lastName}
                        <br/>
                        <small>Gender: {patientData.gender} | Phone: {patientData.phone} |
                            Email: {patientData.email} </small>
                    </a>
                </Link>
            </div>
            <div className="project-actions">
                {!isAdmin && !showEditPatient &&
                <a onClick={handleEditPatient} className="btn btn-white btn-sm">
                    <i className="fa fa-pencil"/> Edit
                </a>}
                {!isAdmin && <a id={'confirmDelete' + patientData.id.toString()} onClick={togglePopover}
                                className="btn btn-white btn-sm ml-2">
                    <i className="fa fa-trash"/> Delete
                </a>}
                <Popover target={'confirmDelete' + patientData.id.toString()} isOpen={popoverOpen}
                         placement={'auto'}>
                    <PopoverBody>
                        <div>Are you sure you want to delete?</div>
                        <div className="grid-container justify-content-center mt-1">
                            <Button className="btn btn-sm btn-danger" onClick={() => {
                                onDeletePatient(patientData.id)
                            }}>Delete</Button>
                            <Button className="btn btn-white btn-sm ml-2"
                                    onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
            {showEditPatient ?
                <EditPatient patientId={patientData.id} onPatientEdited={handleEdited} patientData={patientData}
                             onCancelEditing={cancelEdit}/> : null}
        </div>
    )
}

export default PatientItem
