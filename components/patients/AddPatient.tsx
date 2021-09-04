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


    const [shouldShowError, setShouldShowError] = useState(false)

    async function createPatient() {
        const res = await patientService.createPatient({
            firstName, lastName, phone, email, password, gender
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
                           type="number" placeholder="Enter patient's contact number"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password" placeholder="Enter patient's password"
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
                    <div className="d-flex">
                        <div className="form-check flex-grow-1">
                            <input className="form-check-input" type="radio" name="gender" onChange={(e)=>setGender(e.target.value)}
                                   value="male" checked={gender === 'male'}/>
                            <label className="form-check-label" htmlFor="gridRadios1">
                                Male
                            </label>
                        </div>
                        <div className="form-check flex-grow-1">
                            <input className="form-check-input" type="radio" name="gender" onChange={(e)=>setGender(e.target.value)}
                                   value="female" checked={gender === 'female'}/>
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Female
                            </label>
                        </div>
                    </div>

                </div>
            </form>
        </div>
        {shouldShowError && <div className="col-sm-12">
            <div className="alert alert-danger" role="alert">
                Invalid input or email existed
            </div>

        </div>}
        <button className="btn btn-primary float-left update" onClick={createPatient}>
            <strong>Add Patient</strong>
        </button>

    </div>
}

export default AddPatient