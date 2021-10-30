import {useRouter} from "next/router";
import {useState} from "react";
import allergyService from "../../../services/allergyService/allergyService";
import s from "../../patients/AddPatient/index.module.scss";
import addDoctorStyle from "../../patient-details/History/index.module.scss"

type TProps = {
    onAllergyAdded: () => void
    onCancelAdding: () => void
}

const AddAllergy = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query
    // 1. Get form data via state + onChange
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date().toISOString())
    const [descriptions, setDescriptions] = useState('')

    const newDate = new Date(date)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    // 2. Click on the Add Allergy Button, send the collected data to server using AllergyService
    async function createAllergy() {
        const myPatientId = typeof patientId === 'string' ? patientId : ''
        const response = await allergyService.createAllergy(myPatientId, {
            name,
            date: dateForServer,
            descriptions,
        })
        if (response && response?.status && response.status.code === 200) {
            props.onAllergyAdded()

            // Fire event
            if (typeof window !== 'undefined') {
                const event = new Event("allergyAdded")
                window.dispatchEvent(event)
            }

            // @ts-ignore
        } else if (response?.error === 400) {
            setShouldShowError(true)
            setTimeout(() => {
                setShouldShowError(false)
            }, 5000)
        }
    }

    const [isNameError, setIsNameError] = useState(false)
    const [isDescriptionError, setIsDescriptionError] = useState(false)

    const validate = () => {
        let isValid = true

        //1. VALIDATE NAME
        if (name.trim().length === 0) {
            isValid = false
            setIsNameError(true)
        } else setIsNameError(false)

        if (descriptions.trim().length === 0) {
            isValid = false
            setIsDescriptionError(true)
        } else setIsDescriptionError(false)

        if (isValid) {
            createAllergy()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return (
        <div className={`${s.addPatient} animated fadeIn`}>
            <form role="form" className={addDoctorStyle.addDoctor}>
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                           type="text" placeholder="Input allergy name"
                           className={`form-control ${isNameError ? 'is-invalid' : 'is-valid'}`}/>
                    {isNameError ? <div className="invalid-feedback">
                        Name cannot be blank!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Descriptions</label>
                    <textarea value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                              placeholder="Input description"
                              className={`form-control  ${isDescriptionError ? 'is-invalid' : 'is-valid'}`}/>
                    {isDescriptionError ? <div className="invalid-feedback">
                        Descriptions can not be blank!
                    </div> : null}
                </div>
            </form>

            {
                shouldShowError && <div className="col-sm-12">
                    <div className="alert alert-danger" role="alert">
                        Invalid input
                    </div>
                </div>
            }
            <button className="btn btn-primary btn-sm" onClick={validate}>
                Add Allergy
            </button>
            <button className="btn btn-default btn-sm update" onClick={cancelAdd}>
                Cancel
            </button>
        </div>
    )
}
export default AddAllergy