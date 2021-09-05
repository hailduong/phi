import {useState} from 'react'
import s from './index.module.scss'

const EditPatient = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')

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
                        <input value={gender} onChange={(event) => setGender(event.target.value)}
                               type="text" placeholder="Enter patient's gender"
                               className="form-control"/>
                    </div>
                </form>
            </div>

            <button className="btn btn-primary float-left update">
                <strong>Update Patient</strong>
            </button>

        </div>
    </div>
}

export default EditPatient