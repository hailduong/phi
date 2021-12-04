import {useState} from 'react'
import {useRouter} from 'next/router'
import prescriptionService from '../../../services/prescriptionService/prescriptionService'
import addPatientStyle from "../../patients/AddPatient/index.module.scss"
import editPrescriptionStyle from "../Prescription/index.module.scss"
import {TPrescriptionEntity} from "../../../services/prescriptionService/prescriptionTypes";
import s from "../History/index.module.scss"

type TProps = {
    prescriptionId: number
    onPrescriptionEdited: () => void
    onCancelEditing: () => void
    prescriptionData: TPrescriptionEntity
}

const EditPrescription = (props: TProps) => {
    const {prescriptionData} = props

    const router = useRouter()
    const {patientId} = router.query

    const [name, setName] = useState(prescriptionData.name)
    const [descriptions, setDescriptions] = useState(prescriptionData.descriptions)
    const [date, setDate] = useState(new Date(prescriptionData.date * 1000 || Date.now()).toISOString().split('T')[0])
    const [shouldShowError, setShouldShowError] = useState(false)
    const newDate = new Date(date)
    const dateForInput = newDate.toISOString().split('T') [0]
    const dateForServer = newDate.getTime() / 1000

    async function updatePrescription() {

        if (typeof patientId === 'string') {
            const response = await prescriptionService.updatePrescription(patientId, props.prescriptionId, {
                name,
                date: dateForServer,
                descriptions
            })
            if (response && response?.status && response?.status.code === 200) {
                props.onPrescriptionEdited()
                // Fire an event
                if (window !== 'undefined') {
                    const event = new Event('prescriptionEdited')
                    window.dispatchEvent(event)
                }
            } else if (response?.error === 400) {
                setShouldShowError(true)
                setTimeout(()=>{
                    setShouldShowError(false)
                },5000)
            }
        }
    }

    const cancelEdit = () => props.onCancelEditing()

    return <div className={`updateBox animated fadeIn ${addPatientStyle.addPatient}`}>
        <form role="form" className={editPrescriptionStyle.addHistory}>
            <div className="form-group">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                       type="text" placeholder="Input prescription name" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Date</label>
                <input value={dateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                       onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                       type="date" className="form-control"/>
            </div>
            <div className={`form-group ${s.description}`}>
                <label>Descriptions</label>
                <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                          placeholder="Input description" className="form-control"/>
            </div>
        </form>
        {shouldShowError && <div className="col-sm-12">
            <div className="alert alert-danger" role="alert">
                Invalid input or email existed
            </div>

        </div>}
        <button className="btn btn-primary btn-sm" onClick={updatePrescription}>
            <>Update Prescription</>
        </button>
        <button className="btn btn-default btn-sm update" onClick={cancelEdit}>
            <>Cancel</>
        </button>
    </div>
}

export default EditPrescription