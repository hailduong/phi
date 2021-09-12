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
                    <div className="form-group">
                        <label>Password</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)}
                               type="password" placeholder="Enter patient's password"
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
                        <div className="d-flex">
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
                        </div>
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