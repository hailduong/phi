import {TEmergencyData} from './index'
import Image from 'next/image'
import {useState} from 'react'
import EditEmergency from './EditEmergency'
import s from './index.module.scss'
import {Button, Popover, PopoverBody} from "reactstrap";
import {useIsAdmin} from "../../common/SideBar";

type TProps = {
    emergencyData: TEmergencyData
    onDeleteEmergency: (id: number) => void
}

const EmergencyItem = (props: TProps) => {
    const isAdmin = useIsAdmin()
    const {emergencyData, onDeleteEmergency} = props

    const [showEdit, setShowEdit] = useState(false)
    const handleEdit = () => {
        setShowEdit(!showEdit)
    }

    const handleEdited = () => {
        setShowEdit(false)
    }

    const [popoverOpen, setPopoverOpen] = useState(false)
    const togglePopover = () => setPopoverOpen(!popoverOpen)

    return (
        <div className="feed-element grid-container" key={emergencyData.id}>
            <div>
                <a href="#" className={`${s.icon} mr-1 float-left`}>
                    <Image alt="icon" width={20} height={20} src="/img/icons8-allergies-32.png"/>
                </a>
                <div className="media-body">
                    <h4>{emergencyData.name} - {emergencyData.relationship}</h4>
                </div>
                <div>Gender: {emergencyData.gender} | Phone: {emergencyData.phone} | Email: {emergencyData.email} |
                    Address: {emergencyData.address}</div>
            </div>
            <div className="project-actions">
                {!isAdmin && !showEdit &&
                <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/> Edit</a>}
                {!isAdmin && <a className="btn btn-white btn-sm ml-2" id={"Delete" + emergencyData.id.toString()}
                                onClick={togglePopover}>
                    <i className="fa fa-trash"/> Delete
                </a>}
                <Popover target={"Delete" + emergencyData.id.toString()} isOpen={popoverOpen} placement={"auto"}>
                    <PopoverBody>
                        Are you sure you want to delete?
                        <div className="grid-container justify-content-center mt-2">
                            <Button className='btn btn-sm btn-danger'
                                    onClick={() => onDeleteEmergency(emergencyData.id)}>Delete</Button>
                            <Button className='btn btn-sm btn-default ml-2' onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>

            </div>
            <div className="grid-item mt-2">
                {showEdit ?
                    <EditEmergency emergencyData={emergencyData} emergencyId={emergencyData.id} onCancelEditing={handleEdit}
                                   onEmergencyEdited={handleEdited}/> : null}
            </div>
        </div>
    )
}

export default EmergencyItem