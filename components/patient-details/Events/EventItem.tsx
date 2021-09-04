import {TEventData} from "./EventPatient";
import Image from "next/image";

type TProps = {
    eventData: TEventData
    onDeleteEvent: (id: number) => void
}

const EventItem = (props: TProps) => {
    const {eventData, onDeleteEvent} = props

    const newDate = new Date(eventData.date * 1000)
    const dateForInput = newDate.toISOString().split('T')[0]

    return (
        <div className="grid-container feed-element" key={eventData.id}>
            <div>
                <a href="#" className="float-left">
                    <Image alt="image" height={"29px"} width={"29px"} src={"/img/events--v2.png"}/>
                </a>
                <h4> {eventData.name} </h4>
                <div>{eventData.descriptions}</div>
            </div>
            <div className="project-actions">
                <a className="btn btn-white btn-sm">
                    <i className="fa fa-pencil"/> Edit</a>
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeleteEvent(eventData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>
                <div>{dateForInput}</div>
            </div>
        </div>
    )
}

export default EventItem