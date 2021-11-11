import {useRouter} from "next/router";
import {useState} from "react";
import s from "../../patients/AddPatient/index.module.scss";
import addDoctorStyle from "../../patient-details/History/index.module.scss"
import emergencyService from "../../../services/emergencyService/emergencyService";

type TProps = {
    onEmergencyAdded: () => void
    onCancelAdding: () => void
}

const AddEmergency = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query
    // 1. Get form data via state + onChange
    const [name, setName] = useState('')
    // const [date, setDate] = useState(new Date().toISOString())
    // const [descriptions, setDescriptions] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [relationship, setRelationship] = useState('')

    //phone, relationship

    const [shouldShowError, setShouldShowError] = useState(false)

    // 2. Click on the Add Allergy Button, send the collected data to server using AllergyService
    async function createEmergency() {
        const myPatientId = typeof patientId === 'string' ? patientId : ''
        const response = await emergencyService.createEmergency(myPatientId, {
            name,
            gender,
            phone,
            relationship
        })
        if (response && response?.status && response.status.code === 200) {
            props.onEmergencyAdded()

            // Fire event
            if (typeof window !== 'undefined') {
                const event = new Event("emergencyAdded")
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
    const [isRelationshipError, setIsRelationshipError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPhoneError, setIsPhoneError] = useState(false)
    const [isGenderError, setIsGenderError] = useState(false)
    const [isAddressError, setIsAddressError] = useState(false)

    const validate = () => {
        let isValid = true

        //1. VALIDATE NAME
        if (name.trim().length === 0) {
            isValid = false
            setIsNameError(true)
        } else setIsNameError(false)

        if (relationship.trim().length === 0) {
            isValid = false
            setIsRelationshipError(true)
        } else setIsRelationshipError(false)

        if (gender.trim().length === 0) {
            isValid = false
            setIsGenderError(true)
        } else setIsGenderError(false)

        // if (address.trim().length === 0) {
        //     isValid = false
        //     setIsAddressError(true)
        // } else setIsAddressError(false)

        let phoneRegex: RegExp = /[0-9+\-()]{5,20}/g

        if (!phoneRegex.test(phone.trim())) {
            isValid = false
            setIsPhoneError(true)
        } else setIsPhoneError(false)

        // let emailRegex: RegExp = /[\w.-]+@[\w.-]+\.\w{2,4}/g
        //
        // if (!emailRegex.test(email.trim())) {
        //     isValid = false
        //     setIsEmailError(true)
        // } else setIsEmailError(false)

        if (isValid) {
            createEmergency()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return (
        <div className={`${s.addPatient} animated fadeIn`}>
            <form role="form" className={addDoctorStyle.addDoctor}>
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                           type="text" placeholder="Input name"
                           className={`form-control ${isNameError ? 'is-invalid' : 'is-valid'}`}/>
                    {isNameError ? <div className="invalid-feedback">
                        Name cannot be blank!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Relationship</label>
                    <input type='text' value={relationship} onChange={(e) => setRelationship(e.target.value)}
                           placeholder="Input relationship"
                           className={`form-control  ${isRelationshipError ? 'is-invalid' : 'is-valid'}`}/>
                    {isRelationshipError ? <div className="invalid-feedback">
                        Relationship cannot be left blank!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)}
                           placeholder="Input phone"
                           className={`form-control  ${isPhoneError ? 'is-invalid' : 'is-valid'}`}/>
                    {isPhoneError ? <div className="invalid-feedback">
                        Phone number is invalid!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div className={`d-flex form-checked form-control ${isGenderError ? 'is-invalid' : ' is-valid'}`}>
                        <div className="form-check flex-grow-1">
                            <input className="form-check-input" type="radio" name="gender" required
                                   onChange={(e) => setGender(e.target.value)}
                                   value="male" checked={gender === 'male'}/>
                            <label className="form-check-label" htmlFor="gridRadios1">
                                Male
                            </label>
                        </div>
                        <div className="form-check flex-grow-1">
                            <input className="form-check-input" type="radio" name="gender" required
                                   onChange={(e) => setGender(e.target.value)}
                                   value="female" checked={gender === 'female'}/>
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Female
                            </label>
                        </div>
                        <div className="form-check flex-grow-1">
                            <input className="form-check-input" type="radio" name="gender" required
                                   onChange={(e) => setGender(e.target.value)}
                                   value="others" checked={gender === 'others'}/>
                            <label className="form-check-label" htmlFor="gridRadios3">
                                Others
                            </label>
                        </div>

                    </div>
                    {isGenderError ? <div className="invalid-feedback">
                        Gender can not be left blank!
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
                Add Emergency
            </button>
            <button className="btn btn-default btn-sm update" onClick={cancelAdd}>
                Cancel
            </button>
        </div>
    )
}
export default AddEmergency