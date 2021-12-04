import {useState} from 'react'
import historyService from '../../../services/history/historyService'
import {useRouter} from 'next/router'
import addPatientStyle from '../../patients/AddPatient/index.module.scss'
import s from './index.module.scss'

type TProps = {
    onHistoryAdded: () => void
    onCancelAdding: () => void
}

const AddHistory = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query

    const [name, setName] = useState('')
    const [fromDate, setFromDate] = useState(new Date().toISOString())
    const [toDate, setToDate] = useState(new Date().toISOString())
    const [descriptions, setDescriptions] = useState('')

    const newFromDate = new Date(fromDate)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const fromDateForServer = newFromDate.getTime() / 1000
    const [shouldShowError, setShouldShowError] = useState(false)

    const newToDate = new Date(toDate)
    const toDateForInput = newToDate.toISOString().split('T')[0]
    const toDateForServer = newToDate.getTime() / 1000

    async function createHistory() {

        const myPatientId = typeof patientId === 'string' ? patientId : ''
        const response = await historyService.createHistory(myPatientId, {
            name,
            descriptions,
            fromDate: fromDateForServer,
            toDate: toDateForServer
        })

        if (response && response?.status && response?.status.code === 200) {
            props.onHistoryAdded()
            if (window !== 'undefined') {
                const event = new Event('historyAdded')
                window.dispatchEvent(event)
            }
        } else if (response?.error === 400) {
            setShouldShowError(true)
            setTimeout(()=> {
                setShouldShowError(false)
            }, 5000)
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

        //2. Validate DESCRIPTIONS
        if (descriptions.trim().length === 0) {
            isValid = false
            setIsDescriptionError(true)
        } else setIsDescriptionError(false)

        if (isValid) {
            createHistory()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return (
        <form className={`${addPatientStyle.addPatient} animated fadeIn`}>
            <div className="pt-2">
                <div className={s.addHistory}>
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                               type="text" placeholder="Input history name"
                               className={`form-control ${isNameError ? 'is-invalid' : 'is-valid'}`}/>
                        {isNameError ? <div className="invalid-feedback">
                            History name can not be blank!
                        </div> : null}
                    </div>
                    <div className="form-group">
                        <label>From Date</label>
                        <input value={fromDateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                               onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
                               type="date" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>To Date</label>
                        <input value={toDateForInput} min={fromDateForInput}
                               max={new Date(Date.now()).toISOString().split('T')[0]}
                               onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
                               type="date" className="form-control"/>
                    </div>
                    <div className={s.description}>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                                      placeholder="Input description"
                                      className={`form-control ${isDescriptionError ? 'is-invalid' : 'is-valid'}`}/>
                            {isDescriptionError ? <div className="invalid-feedback">
                                Descriptions can not be blank!
                            </div> : null}
                        </div>
                    </div>
                    {shouldShowError && <div className="alert alert-danger" role="alert">
                        Invalid input or email existed!
                    </div>}
                </div>
                <button type='button' className="btn btn-primary btn-sm" onClick={validate}>Add History</button>
                <button type='button' className="btn btn-default btn-sm update" onClick={cancelAdd}>Cancel</button>
            </div>
        </form>
    )
}

export default AddHistory