import {useState} from "react";
import historyService from "../../../services/history/historyService";
import {useRouter} from "next/router";

type TProps = {
    historyId: number
    onHistoryEdited: () => void
}

const EditHistory = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query

    const [name, setName] = useState('')
    const [fromDate, setFromDate] = useState(new Date().toISOString())
    const [toDate, setToDate] = useState(new Date().toISOString())
    const [descriptions, setDescriptions] = useState('')

    const newFromDate = new Date(fromDate)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const fromDateForServer = newFromDate.getTime() / 1000


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

    return <div className="row pt-2">
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                           type="text" placeholder="Enter history name"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>From Date</label>
                    <input value={fromDateForInput}
                           onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
                           type="date" placeholder="Enter starting date" className="form-control"/>
                </div>
            </form>
        </div>
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>Description</label>
                    <input value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                           type="text" placeholder="Enter description"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>To Date</label>
                    <input value={toDateForInput}
                           onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
                           type="date" placeholder="Enter ending date" className="form-control"/>
                </div>
            </form>
        </div>


        {/*{shouldShowError && <div className="col-sm-12">*/}
        {/*    <div className="alert alert-danger" role="alert">*/}
        {/*        Invalid input or email existed*/}
        {/*    </div>*/}

        {/*</div>}*/}
        <button className="btn btn-primary float-left update" onClick={updateHistory}>
            <strong>Update History</strong>
        </button>
    </div>
}

export default EditHistory