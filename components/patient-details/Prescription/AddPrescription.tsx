import {useState} from "react";
import {useRouter} from "next/router";
import prescriptionService from "../../../services/prescriptionService/prescriptionService";
import addPatientStyle from "../../patients/AddPatient/index.module.scss";
import s from "../Prescription/index.module.scss"

type TProps = {
    onPrescriptionAdded: () => void
    onCancelAdding: () => void
}

const AddPrescription = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query

    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [date, setDate] = useState(new Date().toISOString())
    const [shouldShowError, setShouldShowError] = useState(false)
    const newDate = new Date(date)
    const dateForInput = newDate.toISOString().split('T') [0]
    const dateForServer = newDate.getTime() / 1000

    async function createPrescription() {

        if (typeof patientId === 'string') {
            const response = await prescriptionService.createPrescription(patientId, {
                name,
                date: dateForServer,
                descriptions
            })
            if (response && response?.status && response?.status.code === 200) {
                props.onPrescriptionAdded()
                // Fire an event
                if (window !== 'undefined') {
                    const event = new Event('prescriptionAdded')
                    window.dispatchEvent(event)
                }
            }
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
            createPrescription()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return <div className={`${addPatientStyle.addPatient} animated fadeIn`}>
        <form role="form" className={s.addHistory}>
            <div className="form-group">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                       type="text" placeholder="Input prescription name"
                       className={`form-control ${isNameError ? 'is-invalid' : 'is-valid'}`}/>
                {isNameError ? <div className="invalid-feedback">
                    Name cannot be blank!
                </div> : null}
            </div>
            <div className="form-group">
                <label>Date</label>
                <input value={dateForInput} onChange={(e) => setDate(new Date(e.target.value).toISOString)}
                       type="date" className="form-control" max={new Date(Date.now()).toISOString().split('T')[0]}/>
            </div>
            <div className={`form-group ${s.description}`}>
                <label> Descriptions</label>
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
                Invalid input or email existed
            </div>
        </div>}
        <button className="btn btn-primary btn-sm" onClick={validate}>Add Prescription</button>
        <button className="btn btn-default btn-sm update" onClick={cancelAdd}>Cancel</button>
    </div>
}

export default AddPrescription