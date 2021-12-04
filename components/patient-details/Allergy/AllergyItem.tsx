import {TAllergyEntity} from "../../../services/allergyService/allergyTypes";
import Image from 'next/image'
import {useState} from 'react'
import EditAllergy from './EditAllergy'
import s from './index.module.scss'
import {Button, Popover, PopoverBody} from "reactstrap";
import {useIsAdmin} from "../../common/SideBar";

type TProps = {
    allergyData: TAllergyEntity
    onDeleteAllergy: (id: number) => void
}

const AllergyItem = (props: TProps) => {
    const isAdmin = useIsAdmin()
    const {allergyData, onDeleteAllergy} = props

    const newDate = new Date(allergyData.date * 1000)
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
        <div className="feed-element grid-container" key={allergyData.id}>
            <div>
                <a href="#" className={`${s.icon} mr-1 float-left`}>
                    <Image alt="icon" width={20} height={20} src="/img/icons8-allergies-32.png"/>
                </a>
                <div className="media-body">
                    <h4>{allergyData.name}</h4>
                </div>
                <div>Description: {allergyData.descriptions}</div>
            </div>
            <div className="project-actions">
                {!isAdmin && !showEdit &&
                    <a className="btn btn-white btn-sm" onClick={handleEdit}>
                        <i className="fa fa-pencil"/> Edit</a>}
                {!isAdmin && <a className="btn btn-white btn-sm ml-2" id={"Delete" + allergyData.id.toString()}
                   onClick={togglePopover}>
                    <i className="fa fa-trash"/> Delete
                </a>}
                <Popover target={"Delete" + allergyData.id.toString()} isOpen={popoverOpen} placement={"auto"}>
                    <PopoverBody>
                        Are you sure you want to delete?
                        <div className="grid-container justify-content-center mt-2">
                            <Button className='btn btn-sm btn-danger'
                                    onClick={() => onDeleteAllergy(allergyData.id)}>Delete</Button>
                            <Button className='btn btn-sm btn-default ml-2' onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>

            </div>
            <div className="grid-item mt-2">
                {showEdit ? <EditAllergy allergyData={allergyData} allergyId={allergyData.id} onCancelEditing={handleEdit}
                                         onAllergyEdited={handleEdited}/> : null}
            </div>
        </div>
    )
}

export default AllergyItem