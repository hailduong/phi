import {useEffect, useState} from 'react'
import EventItem from './EventItem'
import {useRouter} from 'next/router'
import eventService from '../../../services/eventService/eventService'
import {Pagination} from "antd";
import {TEventEntity} from "../../../services/eventService/eventTypes";

const EventPatient = () => {
    const router = useRouter()
    const {patientId = ''} = router.query
    const [eventData, setEventData] = useState<TEventEntity[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const handlePaginationChange = async (page: number) => {
        setPage(page)
        await getData(page)
    }

    const getData = async (pageNo: number = page) => {
        // Get Data
        const data = await eventService.getAllEvents(patientId as string, pageNo)

        if (data?.status.code === 200) {
            // Update the event data
            const eventData = !!data.data ? data.data : []
            setEventData(eventData)

            // Update total number
            setTotal(data.total)
        }
    }

    useEffect(() => {
        getData(page)
    }, [patientId])

    useEffect(() => {
        getData(page)
    }, [page])

    const handleDeleteEvent = async (eventId: number) => {
        await eventService.deleteEvent(patientId as string, eventId)
        await getData(page)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('eventAdded', () => {
                getData(page)
            })
            window.addEventListener('eventUpdated', () => {
                getData(page)
            })
        }
    }, [])

    const eventList = eventData.map(event => <EventItem onDeleteEvent={handleDeleteEvent}
                                                        eventData={event}
                                                        key={event.id}/>)
    return <div className="tab-pane active show" id="tab-4">
        <div className="feed-activity-list">
            {eventData.length !== 0 ? <div>{eventList}
                <div className="text-center mt-3">
                    <Pagination onChange={handlePaginationChange} total={total}/>
                </div>
            </div> : <div className="text-center">There is no event.</div>}
        </div>
    </div>
}

export default EventPatient