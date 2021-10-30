import {useState} from 'react'
import patientService from '../../../services/patients/patientService'
import s from './index.module.scss'
import addDoctorStyle from '../../patient-details/History/index.module.scss'

type TProps = {
    onPatientAdded: () => void
    onCancelAdding: () => void
}

const AddPatient = (props: TProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
    const [insurance, setInsurance] = useState('')
    const [medicalGroup, setMedicalGroup] = useState('')
    const [healthPlan, setHealthPlan] = useState('')

    const newDate = new Date(dateOfBirth)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    async function createPatient() {
        const res = await patientService.createPatient({
            firstName,
            lastName,
            phone,
            email,
            password,
            gender,
            dateOfBirth: dateForServer,
            insurance,
            medicalGroup,
            healthPlan
        })

        // @ts-ignore
        if (res && res?.status && res.status.code === 200) {
            props.onPatientAdded()
            // @ts-ignore
        } else if (res?.error === 400) {
            setShouldShowError(true)
            setTimeout(() => {
                setShouldShowError(false)
            }, 5000)
        }
    }

    const cancelAdded = () => {
        props.onCancelAdding()
    }

    /* Validation */
    const [isFirstNameError, setIsFirstNameError] = useState(false)
    const [isLastNameError, setIsLastNameError] = useState(false)
    const [isPhoneError, setIsPhoneError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isGenderError, setIsGenderError] = useState(false)
    const [isInsuranceError, setIsInsuranceError] = useState(false)
    const [isMedicalGroupError, setIsMedicalGroupError] = useState(false)
    const [isHealthPlanError, setIsHealthPlanError] = useState(false)

    const validate = () => {

        let isValid = true

        // Validate first name
        if (firstName.trim().length === 0) {
            isValid = false
            setIsFirstNameError(true)
        } else setIsFirstNameError(false)

        // Validate last name
        if (lastName.trim().length === 0) {
            isValid = false
            setIsLastNameError(true)
        } else setIsLastNameError(false)

        // Validate phone number
        let phoneRegex: RegExp = /[0-9+\-()]{5,20}/g

        if (!phoneRegex.test(phone.trim())) {
            isValid = false
            setIsPhoneError(true)
        } else setIsPhoneError(false)

        // Validate email
        let emailRegex: RegExp = /[\w.-]+@[\w.-]+\.\w{2,4}/g

        if (!emailRegex.test(email.trim())) {
            isValid = false
            setIsEmailError(true)
        } else setIsEmailError(false)

        //Validate password
        let passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

        if (!passwordRegex.test(password.trim())) {
            isValid = false
            setIsPasswordError(true)
        } else setIsPasswordError(false)

        //Validate insurance
        if (insurance.trim().length === 0) {
            isValid = false
            setIsInsuranceError(true)
        } else setIsInsuranceError(false)

        //Validate medical group
        if (medicalGroup.trim().length === 0) {
            isValid = false
            setIsMedicalGroupError(true)
        } else setIsMedicalGroupError(false)

        //Validate health plan
        if (healthPlan.trim().length === 0) {
            isValid = false
            setIsHealthPlanError(true)
        } else setIsHealthPlanError(false)

        //Validate gender
        if (gender.trim().length === 0) {
            isValid = false
            setIsGenderError(true)
        } else setIsGenderError(false)

        if (isValid) {
            createPatient()
        }
    }

    /* Render */
    return <div className={`${s.addPatient} animated fadeIn`}>
        <form role="form" className={addDoctorStyle.addDoctor}>
            {/*1. First name*/}
            <div className="form-group">
                <label>First Name</label>
                <input value={firstName}
                       className={`form-control ${isFirstNameError ? 'is-invalid' : 'is-valid'}`}
                       onChange={(e) => setFirstName(e.target.value)}
                       type="text" placeholder="Input patient's first name"/>
                {isFirstNameError ? <div className="invalid-feedback">
                    First name cannot be left blank!
                </div> : null}
            </div>
            {/*2. Phone*/}
            <div className="form-group">
                <label>Phone</label>
                <input value={phone} className={`form-control ${isPhoneError ? 'is-invalid' : 'is-valid'}`}
                       onChange={(e) => setPhone(e.target.value)}
                       type="text" placeholder="Input patient's phone"
                />
                {isPhoneError ? <div className="invalid-feedback">
                    Phone number should be around 5-20 characters!
                </div> : null}
            </div>
            {/*3. Date Of Birth*/}
            <div className="form-group">
                <label>Date of Birth</label>
                <input value={dateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                       onChange={(e) => setDateOfBirth(new Date(e.target.value).toISOString())}
                       type="date" placeholder="Input patient's contact number"
                       className="form-control"/>
            </div>
            {/*4. Password*/}
            <div className="form-group">
                <label>Password</label>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password" placeholder="Input password"
                       className={`form-control ${isPasswordError ? 'is-invalid' : 'is-valid'}`}/>
                {isPasswordError ? <div className="invalid-feedback">
                    Password should be 8 character long, with uppercase, lowercase, special character!
                </div> : null}
            </div>
            {/*6.  Insurance*/}
            <div className="form-group">
                <label>Medical Group</label>
                <input value={medicalGroup}
                       onChange={(e) => setMedicalGroup(e.target.value)}
                       type="text" placeholder="Input patient's medical group"
                       className={`form-control ${isMedicalGroupError ? 'is-invalid' : 'is-valid'}`}/>
                {isMedicalGroupError ? <div className="invalid-feedback">
                    Medical Group cannot be left blank!
                </div> : null}
            </div>
            {/*7. Health Plan*/}
            <div className="form-group">
                <label>Health Plan</label>
                <textarea value={healthPlan}
                          onChange={(e) => setHealthPlan(e.target.value)}
                          placeholder="Input patient's health plan"
                          className={`form-control ${isHealthPlanError ? 'is-invalid' : 'is-valid'}`}/>
                {isHealthPlanError ? <div className="invalid-feedback">
                    Health plan cannot be left blank!
                </div> : null}
            </div>
            {/*1. Last Name*/}
            <div className="form-group">
                <label>Last Name</label>
                <input value={lastName}
                       className={`form-control ${isLastNameError ? 'is-invalid' : 'is-valid'}`}
                       onChange={(e) => setLastName(e.target.value)}
                       type="text" placeholder="Input patient's last name"/>
                {isLastNameError ? <div className="invalid-feedback">
                    Last name cannot be left blank!
                </div> : null}
            </div>
            {/*2. Email*/}
            <div className="form-group">
                <label>Email</label>
                <input value={email} className={`form-control ${isEmailError ? 'is-invalid' : 'is-valid'}`}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email" placeholder="Input patient's email address"/>
                {isEmailError ? <div className="invalid-feedback">
                    Email is not in correct format!
                </div> : null}
            </div>
            {/*3. Gender*/}
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
            {/*6. Medical Group*/}
            <div className="form-group">
                <label>Insurance</label>
                <input value={medicalGroup}
                       onChange={(e) => setInsurance(e.target.value)}
                       type="text" placeholder="Input patient's insurance"
                       className={`form-control ${isInsuranceError ? 'is-invalid' : 'is-valid'}`}/>
                {isInsuranceError ? <div className="invalid-feedback">
                    Insurance can not left blank!
                </div> : null}
            </div>
        </form>
        {shouldShowError && <div className="col-sm-12">
            <div className="alert alert-danger" role="alert">
                Invalid input or email existed!
            </div>
        </div>}
        <button className="btn btn-primary btn-sm" onClick={validate}>
            Add Patient
        </button>
        <button className="btn btn-sm btn-default update" onClick={cancelAdded}>
            Cancel
        </button>
    </div>
}

export default AddPatient