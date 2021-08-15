import {use} from "ast-types";
import {useEffect, useState} from "react";
import EventItem from "./EventItem";
import {API_URL} from "../../../env";

export type TEventData = {
    id: number
    name: string
    date: number
    descriptions: string
}

type TEvent = TEventData[]

const EventPatient = () => {
    const [eventData, setEventData] = useState<TEvent>([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/auth/v1/user/event`)
            const data = await response.json()
            if (data.status === '200') {
                setEventData(data.data)
            }
        }
        getData()
    },[])

    const eventList = eventData.map(event => <EventItem eventData={event} key={event.id}/>)
    return <div>{eventList}</div>
}

export default EventPatient