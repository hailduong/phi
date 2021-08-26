import {useEffect, useState} from 'react'
import EventItem from './EventItem'
import {useRouter} from 'next/router'
import eventService from '../../../services/eventService/eventService'

export type TEventData = {
    id: number
    name: string
    date: number
    descriptions: string
}

type TEvent = TEventData[]

const EventPatient = () => {
    const router = useRouter()
    const {patientId = ''} = router.query
    const [eventData, setEventData] = useState<TEvent>([])
    useEffect(() => {
        const getData = async () => {
            const data = await eventService.getAllEvents(patientId as string)
            if (data?.status.code === 200) {
                setEventData(data.data)
            }
        }
        getData()
    }, [patientId])

    const eventList = eventData.map(event => <EventItem eventData={event} key={event.id}/>)
    return <div className="feed-activity-list">
        <div>{eventList}</div>
    </div>
}

export default EventPatient