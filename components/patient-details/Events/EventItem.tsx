import {TEventData} from "./EventPatient";
import Image from "next/image";

type TProps = {
    eventData: TEventData
}

const EventItem = (props: TProps)=> {
    const {eventData} = props

    return (
        <div className="feed-element" key={eventData.id}>
            <a href="#" className="float-left">
                <Image alt="image" height={"29px"} width={"29px"} src={"/img/event--v2.png"}/>
            </a>
            <div className="media-body">
                <div className="float-right from-toDate">
                    {eventData.date}
                </div>
                <h4> {eventData.name} </h4>
                <br/>
            </div>
            <div>{eventData.descriptions}</div>
        </div>
    )
}

export default EventItem