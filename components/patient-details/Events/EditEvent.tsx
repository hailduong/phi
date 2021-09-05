import {useRouter} from 'next/router'
import {useState} from 'react'
import eventService from '../../../services/eventService/eventService'

type TProps = {
    eventId: number
    onEventEdited: () => void
}

const EditEvent = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query
    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')

    const [date, setDate] = useState(new Date().toISOString())
    const newDate = new Date(date)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    async function updateEvent() {
        if (typeof patientId === 'string') {
            const response = await eventService.updateEvent(patientId, props.eventId, {
                name,
                date: dateForServer,
                descriptions
            })

            if (response && response.status && response.status.code === 200) {
                if (typeof window !== 'undefined') {
                    props.onEventEdited()
                    const event = new Event('eventUpdated')
                    window.dispatchEvent(event)
                }
            }
        } else {
            console.warn('patientId is not string:', patientId)
        }
    }

    return <div className="updateBox animated fadeIn">
        <div className="row pt-2">
            <div className="col-sm-6 pt-2">
                <form role="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                               type="text" placeholder="Enter event name" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Descriptions</label>
                        <input value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                               type="text" placeholder="Enter description"
                               className="form-control"/>
                    </div>
                </form>
            </div>
            <div className="col-sm-6 pt-2">
                <form role="form">
                    <div className="form-group">
                        <label>Date</label>
                        <input value={dateForInput} onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                               type="date" placeholder="Enter starting date"
                               className="form-control"/>
                    </div>
                </form>
            </div>
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Invalid input
                </div>
            </div>}
            <button className="btn btn-primary float-left update" onClick={updateEvent}>
                <strong>Update Event</strong>
            </button>
        </div>
    </div>
}

export default EditEvent