import {useState} from 'react'
import s from './index.module.scss'

type TProps = {
    onCancelEditing: () => void
}

const EditPatient = (props: TProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
    const [emergencyContactName, setEmergencyContactName] = useState('')
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('')
    const [emergencyRelationship, setEmergencyRelationship] = useState('')
    const [insurance, setInsurance] = useState('')
    const [medicalGroup, setMedicalGroup] = useState('')
    const [healthPlan, setHealthPlan] = useState('')

    const newDate = new Date(dateOfBirth)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000

    const cancelEdit = () => props.onCancelEditing()

    return <div className={`${s.editPatient} animated fadeIn`}>
        <div className="row pt-2">
            <div className="col-sm-6 pt-2">
                <form role="form">
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
                        <input value={dateForInput}
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
                    <div className="form-group">
                        <label>Emergency Contact Name</label>
                        <input value={emergencyContactName}
                               onChange={(e) => setEmergencyContactName(e.target.value)}
                               type="text" placeholder="Input patient's emergency contact name"
                               className="form-control"/>
                    </div>
                    {/*6.  Insurance*/}
                    <div className="form-group">
                        <label>Insurance</label>
                        <input value={insurance}
                               onChange={(e) => setInsurance(e.target.value)}
                               type="text" placeholder="Input patient's insurance"
                               className="form-control"/>
                    </div>
                    {/*7. Health Plan*/}
                    <div className="form-group">
                        <label>Health Plan</label>
                        <input value={healthPlan}
                               onChange={(e) => setHealthPlan(e.target.value)}
                               type="text" placeholder="Input patient's health plan"
                               className="form-control"/>
                    </div>
                </form>
            </div>
            <div className="col-sm-6 pt-2">
                <form role="form">
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
                    <div className="form-group mt-3">
                        <label>Emergency Contact Number</label>
                        <input value={emergencyContactNumber}
                               onChange={(e) => setEmergencyContactNumber(e.target.value)}
                               type="number" placeholder="Input emergency contact number"
                               className="form-control"/>
                    </div>
                    {/*5. Emergency Relationship*/}
                    <div className="form-group mt-3">
                        <label>Emergency Relationship</label>
                        <input value={emergencyRelationship}
                               onChange={(e) => setEmergencyRelationship(e.target.value)}
                               type="text" placeholder="Input emergency relationship"
                               className="form-control"/>
                    </div>
                    {/*6. Medical Group*/}
                    <div className="form-group">
                        <label>Insurance</label>
                        <input value={medicalGroup}
                               onChange={(e) => setMedicalGroup(e.target.value)}
                               type="text" placeholder="Input patient's insurance"
                               className="form-control"/>
                    </div>
                </form>
            </div>

            <button className="btn btn-primary btn-sm float-left update">
                Update Patient
            </button>
            <button className="btn btn-default float-left update" onClick={cancelEdit}>
                Cancel
            </button>
        </div>
    </div>
}

export default EditPatient