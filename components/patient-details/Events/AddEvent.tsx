import {useRouter} from "next/router";
import {useState} from "react";
import eventService from "../../../services/eventService/eventService";
import addPatientStyle from "../../patients/AddPatient/index.module.scss";
import s from "../History/index.module.scss"

type TProps = {
    onEventAdded: () => void
    onCancelAdding: () => void
}

const AddEvent = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query
    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')

    const [date, setDate] = useState(new Date().toISOString())
    const [dateRemind, setDateRemind] = useState(new Date().toISOString())

    const newDate = new Date(date)
    const newDateRemind = new Date(dateRemind)

    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000
    const dateRemindForInput = newDateRemind.toISOString().split('T')[0]
    const dateRemindFortServer = newDateRemind.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    async function createEvent() {
        if (typeof patientId === 'string') {
            const response = await eventService.createEvent(patientId, {
                name,
                date: dateForServer,
                descriptions,
                dateRemind: dateRemindFortServer
            })

            if (response && response.status && response.status.code === 200) {
                props.onEventAdded()
                if (typeof window !== 'undefined') {
                    const event = new Event("eventAdded")
                    window.dispatchEvent(event)
                }
            }
        } else {
            console.warn('patientId is not string:', patientId)
        }
    }

    const [isNameError, setIsNameError] = useState(false)
    const [isDescriptionError, setIsDescriptionError] = useState(false)

    const validate = () => {
        let isValid = true

        //1. Validate NAME
        if (name.trim().length === 0) {
            isValid = false
            setIsNameError(true)
        } else setIsNameError(false)

        //2. Validate Description
        if (descriptions.trim().length === 0) {
            isValid = false
            setIsDescriptionError(true)
        } else setIsDescriptionError(false)

        if (isValid) {
            createEvent()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return (
        <div className={`${addPatientStyle.addPatient} animated fadeIn`}>
            <div className={s.addHistory}>
                <form role="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                               type="text" placeholder="Input event name"
                               className={`form-control ${isNameError ? 'is-invalid' : 'is-valid'}`}/>
                        {isNameError ? <div className="invalid-feedback">
                            Name cannot be blank!
                        </div> : null}
                    </div>
                </form>
                <form role="form">
                    <div className="form-group">
                        <label>Date</label>
                        <input value={dateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                               onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                               type="date"
                               className="form-control"/>
                    </div>
                </form>
                <form role="form">
                    <div className="form-group">
                        <label>Date Remind</label>
                        <input value={dateRemindForInput} min={new Date(Date.now()).toISOString().split('T')[0]}
                               onChange={(e) => setDateRemind(new Date(e.target.value).toISOString())}
                               type="date"
                               className="form-control"/>
                    </div>
                </form>
                <form role="form" className={s.description}>
                    <div className="form-group">
                        <label>Descriptions</label>
                        <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                                  placeholder="Input description"
                                  className={`form-control ${isDescriptionError ? 'is-invalid' : 'is-valid'}`}/>
                        {isDescriptionError ? <div className="invalid-feedback">
                            Descriptions cannot be blank!
                        </div> : null}
                    </div>
                </form>
                {shouldShowError && <div className="col-sm-12">
                    <div className="alert alert-danger" role="alert">
                        Invalid input
                    </div>
                </div>}
            </div>
            <button className="btn btn-primary btn-sm" onClick={validate}>
                Add Event
            </button>
            <button className="btn btn-default btn-sm update" onClick={cancelAdd}>
                Cancel
            </button>
        </div>
    )
}

export default AddEvent