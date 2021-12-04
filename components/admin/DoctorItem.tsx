import Link from 'next/link'
import {useState} from 'react'
import EditDoctor from "./EditDoctor";
import s from "../patients/PatientItem/index.module.scss"
import {Button, Popover, PopoverBody} from "reactstrap";
import {TDoctorEntity} from "../../services/adminService/adminTypes";

type TProps = {
    doctorData: TDoctorEntity
    onDeleteDoctor: (id: number) => void
}

const DoctorItem = (props: TProps) => {

    const {doctorData, onDeleteDoctor} = props

    const [popoverOpen, setPopoverOpen] = useState(false)

    const togglePopover = () => setPopoverOpen(!popoverOpen)

    return (
        <div className={`grid-container ibox-content ${s.patientItem}`}>
            <Link href={`patient/${doctorData.id}`}>
                <div className="project-title">
                    <a>{doctorData.firstName} {doctorData.lastName}
                        <br/>
                        <small>Gender: {doctorData.gender} | Phone: {doctorData.phone} |
                            Email: {doctorData.email}</small>
                    </a>
                </div>
            </Link>
            <div className="project-actions">
                <div className="media-body">
                    <div className="float-right from-toDate">
                        {doctorData.title}
                    </div>
                </div>
                <a id={'confirmDelete' + doctorData.id.toString()} onClick={togglePopover}
                   className="btn btn-white btn-sm ml-2">
                    <i className="fa fa-trash"/> Delete
                </a>
                <Popover target={'confirmDelete' + doctorData.id.toString()} isOpen={popoverOpen} placement={"auto"}>
                    <PopoverBody>
                        <div>Are you sure you want to delete?</div>
                        <div className='grid-container justify-content-center mt-1'>
                            <Button className='btn btn-sm btn-danger' onClick={() => {
                                onDeleteDoctor(doctorData.id)
                            }}>Delete</Button>
                            <Button className='btn btn-white btn-sm ml-2' onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
        </div>

    )
}

export default DoctorItem
