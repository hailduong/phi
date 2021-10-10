import {useEffect, useState} from 'react'
import EventItem from './EventItem'
import {useRouter} from 'next/router'
import eventService from '../../../services/eventService/eventService'

export type TEventData = {
    id: number
    name: string
    date: number
    descriptions: string
    dateRemind: number
}

type TEvent = TEventData[]

const EventPatient = () => {
    const router = useRouter()
    const {patientId = ''} = router.query
    const [eventData, setEventData] = useState<TEvent>([])
    const getData = async () => {
        const data = await eventService.getAllEvents(patientId as string)
        if (data?.status.code === 200) {
            const eventData = !!data.data ? data.data : []
            setEventData(eventData)
        }
    }
    useEffect(() => {
        getData()
    }, [patientId])

    const handleDeleteEvent = async (eventId: number) => {
        await eventService.deleteEvent(patientId as string, eventId)
        getData()
    }

    useEffect(() => {
        getData()
    }, [patientId])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('eventAdded', () => {
                getData()
            })
            window.addEventListener('eventUpdated', () => {
                getData()
            })
        }
    }, [])

    const eventList = eventData.map(event => <EventItem onDeleteEvent={handleDeleteEvent}
                                                        eventData={event}
                                                        key={event.id}/>)
    return <div className="tab-pane active show" id="tab-4">
        <div className="feed-activity-list">
            <div>{eventList}</div>
        </div>
    </div>
}

export default EventPatient