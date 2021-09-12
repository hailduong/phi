import {useState} from 'react'
import {useRouter} from 'next/router'
import prescriptionService from '../../../services/prescriptionService/prescriptionService'

type TProps = {
    prescriptionId: number
    onPrescriptionEdited: () => void
    onCancelEditing: () => void
}

const EditPrescription = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query

    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [date, setDate] = useState(new Date().toISOString())
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
            }
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
                               type="text" placeholder="Enter prescription name" className="form-control"/>
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
                               type="date" placeholder="Enter patient's last name" className="form-control"/>
                    </div>
                </form>
            </div>
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Invalid input or email existed
                </div>

            </div>}
            <button className="btn btn-primary btn-sm float-left update" onClick={updatePrescription}>
                <>Update Prescription</>
            </button>
            <button className="btn btn-default btn-sm float-left update" onClick={cancelEdit}>
                <>Cancel</>
            </button>
        </div>
    </div>
}

export default EditPrescription