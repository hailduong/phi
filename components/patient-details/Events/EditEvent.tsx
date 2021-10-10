import {useRouter} from 'next/router'
import {useState} from 'react'
import eventService from '../../../services/eventService/eventService'
import {TEventEntity} from "../../../services/eventService/eventTypes";
import addPatientStyle from "../../patients/AddPatient/index.module.scss"
import s from "../History/index.module.scss"

type TProps = {
    eventId: number
    onEventEdited: () => void
    onCancelEditing: () => void
    eventData: TEventEntity
}

const EditEvent = (props: TProps) => {
    const {eventData} = props

    const router = useRouter()
    const {patientId} = router.query
    const [name, setName] = useState(eventData.name)
    const [descriptions, setDescriptions] = useState(eventData.descriptions)
    const [date, setDate] = useState(new Date(eventData.date*1000 || Date.now()).toISOString().split('T')[0])
    const [dateRemind, setDateRemind] = useState(new Date(eventData.dateRemind*1000 || Date.now()).toISOString().split('T')[0])
    const newDate = new Date(date)
    const newDateRemind = new Date(dateRemind)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateRemindForInput = newDateRemind.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000
    const dateRemindForServer = newDateRemind.getTime() / 1000
    debugger
    const [shouldShowError, setShouldShowError] = useState(false)
    async function updateEvent() {
        if (typeof patientId === 'string') {
            const response = await eventService.updateEvent(patientId, props.eventId, {
                name,
                date: dateForServer,
                descriptions,
                dateRemind: dateRemindForServer
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

    const cancelEdit = () => props.onCancelEditing()

    return <div className={`updateBox animated fadeIn ${addPatientStyle.addPatient}`}>
        <div className={s.addHistory}>
            <form role="form">
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                           type="text" placeholder="Input event name" className="form-control"/>
                </div>
            </form>
            <form role="form">
                <div className="form-group">
                    <label>Date</label>
                    <input value={dateForInput} onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                           type="date" placeholder="Input starting date" max={new Date(Date.now()).toISOString().split('T')[0]}
                           className="form-control"/>
                </div>
            </form>
            <form role="form">
                <div className="form-group">
                    <label>Date Remind</label>
                    <input value={dateRemindForInput} min={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setDateRemind(new Date(e.target.value).toISOString())}
                           type="date" className="form-control"/>
                </div>
            </form>
            <form role="form" className={s.description}>
                <div className="form-group">
                    <label>Descriptions</label>
                    <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                              placeholder="Input description" className="form-control"/>
                </div>
            </form>
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Invalid input
                </div>
            </div>}
        </div>
        <button className="btn btn-primary btn-sm" onClick={updateEvent}>
            <>Update Event</>
        </button>
        <button className="btn btn-default btn-sm update" onClick={cancelEdit}>
            <>Cancel</>
        </button>
    </div>
}

export default EditEvent