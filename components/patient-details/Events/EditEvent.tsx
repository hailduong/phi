import {useRouter} from 'next/router'
import {useState} from 'react'
import eventService from '../../../services/eventService/eventService'

type TProps = {
    eventId: number
    onEventEdited: () => void
    onCancelEditing: () => void
}

const EditEvent = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query
    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')

    const [date, setDate] = useState(new Date().toISOString())
    const [dateRemind, setDateRemind] = useState(new Date().toISOString())
    const newDate = new Date(date)
    const newDateRemind = new Date(dateRemind)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateRemindForInput = newDateRemind.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000
    const dateRemindForServer = newDateRemind.getTime() / 1000

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

    return <div className="updateBox animated fadeIn">
        <div className="row pt-2">
            <div className="col-sm-6 pt-2">
                <form role="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                               type="text" placeholder="Input event name" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Descriptions</label>
                        <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                                  placeholder="Input description"
                                  className="form-control"/>
                    </div>
                </form>
            </div>
            <div className="col-sm-6 pt-2">
                <form role="form">
                    <div className="form-group">
                        <label>Date</label>
                        <input value={dateForInput} onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                               type="date" placeholder="Input starting date"
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Date Remind</label>
                        <input value={dateRemindForInput} onChange={(e) => setDateRemind(new Date(e.target.value).toISOString())}
                               type="date"
                               className="form-control"/>
                    </div>
                </form>
            </div>
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Invalid input
                </div>
            </div>}
            <button className="btn btn-primary btn-sm float-left update" onClick={updateEvent}>
                <>Update Event</>
            </button>
            <button className="btn btn-default btn-sm float-left update" onClick={cancelEdit}>
                <>Cancel</>
            </button>
        </div>
    </div>
}

export default EditEvent