import {TEventData} from './index'
import Image from 'next/image'
import {useState} from 'react'
import EditEvent from './EditEvent'
import s from './index.module.scss'
import {Button, Popover, PopoverBody} from "reactstrap";

type TProps = {
    eventData: TEventData
    onDeleteEvent: (id: number) => void
}

const EventItem = (props: TProps) => {
    const {eventData, onDeleteEvent} = props

    const newDate = new Date(eventData.date * 1000)
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
        <div className="grid-container feed-element" key={eventData.id}>
            <div>
                <a href="#" className={`${s.icon} mr-1 float-left`}>
                    <Image alt="image" height={20} width={20} src={'/img/events--v2.png'}/>
                </a>
                <div className="media-body">
                    <h4>{eventData.name}</h4></div>
                <div>Description: {eventData.descriptions}</div>
            </div>
            <div className="project-actions">
                <div className="media-body from-toDate">{dateForInput}</div>
                {showEdit ? null : <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/> Edit</a>}

                <a id={"Delete" + eventData.id.toString()} onClick={togglePopover}
                   className="btn btn-white btn-sm ml-2">
                    <i className="fa fa-trash"/> Delete
                </a>
                <Popover target={"Delete" + eventData.id.toString()} isOpen={popoverOpen} placement={"auto"}>
                    <PopoverBody>
                        Are you sure you want to delete?
                        <div className="grid-container justify-content-center mt-1">
                            <Button className="btn btn-sm btn-danger" onClick={() => {
                                onDeleteEvent(eventData.id)
                            }}>Delete</Button>
                            <Button className="btn btn-sm btn-default ml-2" onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
            <div className="grid-item mt-2">
                {showEdit ? <EditEvent onEventEdited={handleEdited} onCancelEditing={handleEdit}
                                       eventId={eventData.id}/> : null}
            </div>
        </div>
    )
}

export default EventItem