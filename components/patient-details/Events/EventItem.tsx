import {TEventData} from './index'
import Image from 'next/image'
import {useState} from 'react'
import EditEvent from './EditEvent'
import s from './index.module.scss'

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
                <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/>{showEdit ? ' Cancel' : ' Edit'}</a>
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeleteEvent(eventData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>
            </div>

            {showEdit ? <EditEvent onEventEdited={handleEdited} eventId={eventData.id}/> : null}

        </div>
    )
}

export default EventItem