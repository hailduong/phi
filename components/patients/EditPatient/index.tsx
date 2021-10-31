import {useState} from 'react'
import s from './index.module.scss'
import {TPatientEntity} from '../../../services/patients/types'
import addDoctorStyle from '../../patient-details/History/index.module.scss'
import patientService from '../../../services/patients/patientService'

type TProps = {
    onCancelEditing: () => void
    patientData: TPatientEntity
    onPatientEdited: () => void
    patientId: number
}

const EditPatient = (props: TProps) => {

    const {patientData, patientId} = props

    // const router = useRouter()
    // const {patientId} = router.query

    const patientDOB = patientData.dateOfBirth

    const [firstName, setFirstName] = useState(patientData.firstName)
    const [lastName, setLastName] = useState(patientData.lastName)
    const [phone, setPhone] = useState(patientData.phone)
    const [email, setEmail] = useState(patientData.email)
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState(patientData.gender)
    const [dateOfBirth, setDateOfBirth] = useState(new Date(patientDOB * 1000 || Date.now()).toISOString().split('T')[0])
    const [insurance, setInsurance] = useState(patientData.insurance)
    const [medicalGroup, setMedicalGroup] = useState(patientData.medicalGroup)
    const [healthPlan, setHealthPlan] = useState(patientData.healthPlan)
    const newDate = new Date(dateOfBirth)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000

    async function updatePatient() {
        const response = await patientService.updatePatientDetail(patientId, {
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
        if (response && response?.status && response.status.code === 200) {
            props.onPatientEdited()
            if (window !== 'undefined') {
                const event = new Event('patientEdited')
                window.dispatchEvent(event)
            }
        }

    }

    const cancelEdit = () => props.onCancelEditing()
    return <div className={`${s.editPatient} animated fadeIn pt-3`}>
        <form role="form" className={addDoctorStyle.addDoctor}>
            <div className="form-group">
                <label>First Name</label>
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)}
                       type="text" placeholder="Enter patient's first name" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input value={phone} onChange={(event) => setPhone(event.target.value)}
                       type="text" placeholder="Enter patient's contact number"
                       className="form-control"/>
            </div>
            {/*3. Date Of Birth*/}
            <div className="form-group">
                <label>Date of Birth</label>
                <input value={dateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                       onChange={(e) => setDateOfBirth(new Date(e.target.value).toISOString())}
                       type="date" placeholder="Input patient's contact number"
                       className="form-control"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)}
                       type="password" placeholder="Enter patient's password"
                       className="form-control"/>
            </div>
            {/*5. Emergency Contact Name*/}
            {/*6.  Insurance*/}
            <div className="form-group">
                <label>Medical Group</label>
                <input value={medicalGroup}
                       onChange={(e) => setMedicalGroup(e.target.value)}
                       type="text" placeholder="Input medical group"
                       className="form-control"/>
            </div>
            {/*7. Health Plan*/}
            <div className="form-group">
                <label>Health Plan</label>
                <textarea value={healthPlan}
                          onChange={(e) => setHealthPlan(e.target.value)}
                          placeholder="Input patient's health plan"
                          className="form-control"/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input value={lastName} onChange={(event) => setLastName(event.target.value)}
                       type="text" placeholder="Enter patient's last name" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}
                       type="email" placeholder="Enter patient's email address" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Gender</label>
                <div className="d-flex form-checked">
                    <div className="form-check flex-grow-1">
                        <input className="form-check-input" type="radio" name="gender"
                               onChange={(e) => setGender(e.target.value)}
                               value="male" checked={gender === 'male'}/>
                        <label className="form-check-label" htmlFor="gridRadios1">
                            Male
                        </label>
                    </div>
                    <div className="form-check flex-grow-1">
                        <input className="form-check-input" type="radio" name="gender"
                               onChange={(e) => setGender(e.target.value)}
                               value="female" checked={gender === 'female'}/>
                        <label className="form-check-label" htmlFor="gridRadios2">
                            Female
                        </label>
                    </div>
                    <div className="form-check flex-grow-1">
                        <input className="form-check-input" type="radio" name="gender"
                               onChange={(e) => setGender(e.target.value)}
                               value="others" checked={gender === 'others'}/>
                        <label className="form-check-label" htmlFor="gridRadios3">
                            Others
                        </label>
                    </div>
                </div>
            </div>
            {/*4. Emergency Contact Number*/}
            {/*6. Medical Group*/}
            <div className="form-group">
                <label>Insurance</label>
                <input value={insurance}
                       onChange={(e) => setInsurance(e.target.value)}
                       type="text" placeholder="Input insurance"
                       className="form-control"/>
            </div>
        </form>
        <button className="btn btn-primary btn-sm" onClick={updatePatient}>
            Update Patient
        </button>
        <button className="btn btn-default update" onClick={cancelEdit}>
            Cancel
        </button>
    </div>
}

export default EditPatient