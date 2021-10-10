import {useState} from 'react'
import historyService from '../../../services/history/historyService'
import {useRouter} from 'next/router'
import {THistoryEntity} from "../../../services/history/historyTypes";
import s from "./index.module.scss"
import addPatientStyle from "../../patients/AddPatient/index.module.scss";

type TProps = {
    historyId: number
    onHistoryEdited: () => void
    onCancelEditing: () => void
    historyData: THistoryEntity
}

const EditHistory = (props: TProps) => {

    const {historyData} = props

    const router = useRouter()
    const {patientId} = router.query

    const [name, setName] = useState(historyData.name)
    const [fromDate, setFromDate] = useState(new Date(historyData.fromDate*1000 || Date.now()).toISOString().split('T')[0])
    const [toDate, setToDate] = useState(new Date(historyData.toDate*1000 || Date.now()).toISOString().split('T')[0])
    const [descriptions, setDescriptions] = useState(historyData.descriptions)

    const newFromDate = new Date(fromDate)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const fromDateForServer = newFromDate.getTime() / 1000
    const [shouldShowError, setShouldShowError] = useState(false)

    const newToDate = new Date(toDate)
    const toDateForInput = newToDate.toISOString().split('T')[0]
    const toDateForServer = newToDate.getTime() / 1000

    async function updateHistory() {

        const myPatientId = typeof patientId === 'string' ? patientId : ''
        const response = await historyService.updateHistory(myPatientId, props.historyId, {
            name,
            descriptions,
            fromDate: fromDateForServer,
            toDate: toDateForServer
        })

        if (response && response?.status && response?.status.code === 200) {
            props.onHistoryEdited()
            if (window !== 'undefined') {
                const event = new Event('historyEdited')
                window.dispatchEvent(event)
            }
        }
    }
    debugger

    const cancelEdit = () => props.onCancelEditing()

    return <div className={`${addPatientStyle.addPatient} updateBox animated fadeIn`}>
        <div className={`pt-2 ${s.addHistory}`}>
            <form role="form">
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                           type="text" placeholder="Input history name"
                           className="form-control"/>
                </div>
            </form>
            <form role="form">
                <div className="form-group">
                    <label>From Date</label>
                    <input value={fromDateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
                           type="date" placeholder="Enter starting date" className="form-control"/>
                </div>
            </form>
            <form role="form">
                <div className="form-group">
                    <label>To Date</label>
                    <input value={toDateForInput} min={fromDateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
                           type="date" placeholder="Enter ending date" className="form-control"/>
                </div>
            </form>
            <form role="form" className={s.description}>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                              placeholder="Input description"
                              className="form-control"/>
                </div>
            </form>
            {shouldShowError &&
            <div className="alert alert-danger" role="alert">
                Invalid input or email existed
            </div>}
        </div>
        <button className="btn btn-primary btn-sm" onClick={updateHistory}>Update History</button>
        <button className="btn btn-default btn-sm update" onClick={cancelEdit}>Cancel</button>
    </div>
}

export default EditHistory