import {useState} from "react";
import addPatientStyle from "../patients/AddPatient/index.module.scss";
import s from "../patient-details/History/index.module.scss"
import adminService from "../../services/adminService/adminService";

type TProps = {
    onDoctorAdded: () => void
    onCancelAdding: () => void
}

const AddDoctor = (props: TProps) => {

    // 1. Get form data via state + onChange
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [title, setTitle] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')

    // const newDOB = new Date(dob)
    // const newDobForInput = newDOB.toISOString().split('T')[0]
    // const newDobForServer = newDOB.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    // 2. Click on the Add Allergy Button, send the collected data to server using AllergyService
    async function createDoctor() {

        const response = await adminService.createDoctor({
            firstName,
            lastName,
            email,
            title,
            phone,
            gender,
            password
        })
        if (response && response?.status && response.status.code === 200) {
            props.onDoctorAdded()

            // Fire event
            if (typeof window !== 'undefined') {
                const event = new Event("newsAdded")
                window.dispatchEvent(event)
            }


        } else if (response && response?.error === 400) {
            setShouldShowError(true)
            setTimeout(() => {
                setShouldShowError(false)
            }, 5000)
        }
    }

    const [isFirstNameError, setIsFirstNameError] = useState(false)
    const [isLastNameError, setIsLastNameError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPhoneError, setIsPhoneError] = useState(false)
    const [isGenderError, setIsGenderError] = useState(false)
    const [isTitleError, setIsTitleError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)

    const validate = () => {
        let isValid = true

        //1. VALIDATE NAME
        if (firstName.trim().length === 0) {
            isValid = false
            setIsFirstNameError(true)
        } else setIsFirstNameError(false)

        if (lastName.trim().length === 0) {
            isValid = false
            setIsLastNameError(true)
        } else setIsLastNameError(false)

        //2. VALIDATE EMAIL
        let emailRegex: RegExp = /[\w.-]+@[\w.-]+\.\w{2,4}/g

        if (!emailRegex.test(email.trim())) {
            isValid = false
            setIsEmailError(true)
        } else setIsEmailError(false)

        //3. VALIDATE PHONE
        let phoneRegex: RegExp = /[0-9+\-()]{5,20}/g

        if (!phoneRegex.test(phone.trim())) {
            isValid = false
            setIsPhoneError(true)
        } else setIsPhoneError(false)

        //4. VALIDATE GENDER
        if (gender.trim().length === 0) {
            isValid = false
            setIsGenderError(true)
        } else setIsGenderError(false)

        //5. VALIDATE TITLE
        if (title.trim().length === 0) {
            isValid = false
            setIsTitleError(true)
        } else setIsTitleError(false)

        //6. VALIDATE ROLE
        let passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

        if (!passwordRegex.test(password.trim())) {
            isValid = false
            setIsPasswordError(true)
        } else setIsPasswordError(false)

        if (isValid) {
            createDoctor()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return (
        <div className={`${addPatientStyle.addPatient} animated fadeIn`}>
            <form role="form" className={s.addDoctor}>
                <div className="form-group">
                    <label>First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                           type="text" placeholder="Input first name"
                           className={`form-control ${isFirstNameError ? 'is-invalid' : 'is-valid'}`}/>
                    {isFirstNameError ? <div className="invalid-feedback">
                        First Name cannot be blank!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password" className={`form-control  ${isPasswordError ? 'is-invalid' : 'is-valid'}`}/>
                    {isPasswordError ? <div className="invalid-feedback">
                        Password is invalid!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input value={lastName} placeholder="Input last name"
                           onChange={(e) => setLastName(e.target.value)}
                           type="text" className={`form-control  ${isLastNameError ? 'is-invalid' : 'is-valid'}`}/>
                    {isLastNameError ? <div className="invalid-feedback">
                        Last Name can not be blank!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder="Input email" type="text"
                           className={`form-control  ${isEmailError ? 'is-invalid' : 'is-valid'}`}/>
                    {isEmailError ? <div className="invalid-feedback">
                        Email is invalid!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)}
                           placeholder="Input phone" type="text"
                           className={`form-control  ${isPhoneError ? 'is-invalid' : 'is-valid'}`}/>
                    {isPhoneError ? <div className="invalid-feedback">
                        Phone is invalid!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                           placeholder="Input title" type="text"
                           className={`form-control  ${isTitleError ? 'is-invalid' : 'is-valid'}`}/>
                    {isTitleError ? <div className="invalid-feedback">
                        Title cannot be left blank!
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
                Add Doctor
            </button>
            <button className="btn btn-default btn-sm update" onClick={cancelAdd}>
                Cancel
            </button>
        </div>
    )
}
export default AddDoctor