import {useState} from 'react'
import patientService from '../../services/patients/patientService'

type TProps = {
    onPatientAdded: () => void
}

const AddPatient = (props: TProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')

    function createPatient() {
        patientService.createPatient({
            firstName, lastName, phone, email, password, gender
        })

        props.onPatientAdded()
    }

    /* Render */
    return <div className="row pt-2">
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>First Name</label>
                    <input value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           type="text" placeholder="Enter patient's first name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           type="text" placeholder="Enter patient's contact number"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="text" placeholder="Enter patient's password"
                           className="form-control"/>
                </div>
            </form>
        </div>
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>Last Name</label>
                    <input value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           type="text" placeholder="Enter patient's last name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           type="email" placeholder="Enter patient's email address" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <input value={gender}
                           onChange={(e) => setGender(e.target.value)}
                           type="text" placeholder="Enter patient's gender"
                           className="form-control"/>
                </div>
            </form>
        </div>
        <button className="btn btn-primary float-left update" onClick={createPatient}>
            <strong>Add Patient</strong>
        </button>
    </div>
}

export default AddPatient