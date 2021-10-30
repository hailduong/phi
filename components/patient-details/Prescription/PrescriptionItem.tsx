import {TPresData} from './index'
import Image from 'next/image'
import {useState} from 'react'
import EditPrescription from './EditPrescription'
import s from './index.module.scss'
import {Button, Popover, PopoverBody} from "reactstrap";
import {useIsAdmin} from "../../common/SideBar";

type TProps = {
    presData: TPresData
    onDeletePrescription: (id: number) => void
}

const PrescriptionItem = (props: TProps) => {
    const {presData, onDeletePrescription} = props


    const newDate = new Date(presData.date * 1000)
    const isAdmin = useIsAdmin()
    const dateForInput = newDate.toISOString().split('T')[0]

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
        <div className="grid-container feed-element" key={presData.id}>
            <div>
                <a href="#" className={`float-left mr-1 ${s.icon}`}>
                    <Image alt="image" height={20} width={20} src={'/img/treatment-plan.png'}/>
                </a>
                <div className="media-body">
                    <h4> {presData.name} </h4>
                </div>
                <div>{presData.descriptions}</div>
            </div>
            <div className="project-actions">
                <div className="media-body from-toDate">{dateForInput}</div>
                {!isAdmin && !showEdit && <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/> Edit</a>}
                {!isAdmin && <a id={"Delete" + presData.id.toString()} className="btn btn-white btn-sm ml-2" onClick={togglePopover}>
                    <i className="fa fa-trash"/> Delete
                </a>}
                <Popover target={"Delete" + presData.id.toString()} isOpen={popoverOpen} placement={"auto"}>
                    <PopoverBody>
                        Are you sure you want to delete?
                        <div className="grid-container justify-content-center mt-2">
                            <Button className='btn btn-danger btn-sm'
                                    onClick={() => onDeletePrescription(presData.id)}>Delete</Button>
                            <Button className='btn btn-default btn-sm ml-2' onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
            <div className="grid-item mt-2">
                {showEdit ? <EditPrescription prescriptionData={presData} onCancelEditing={handleEdit} prescriptionId={presData.id}
                                              onPrescriptionEdited={handleEdited}/> : null}
            </div>
        </div>
    )
}

export default PrescriptionItem