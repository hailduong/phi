import {useRouter} from 'next/router'
import {useState} from 'react'
import s from "../../patients/AddPatient/index.module.scss";
import addDoctorStyle from "../../patient-details/History/index.module.scss"
import {TEmergencyEntity} from "../../../services/emergencyService/emergencyTypes";
import emergencyService from "../../../services/emergencyService/emergencyService";

type TProps = {
    emergencyId: number
    onEmergencyEdited: () => void
    onCancelEditing: () => void
    emergencyData: TEmergencyEntity
}

const EditEmergency = (props: TProps) => {

    const {emergencyData} = props

    const router = useRouter()
    const {patientId} = router.query
    // 1. Get form data via state + onChange
    const [name, setName] = useState(emergencyData.name)
    // const [date, setDate] = useState(new Date(emergencyData.date * 1000 || Date.now()).toISOString().split('T')[0])
    // const [descriptions, setDescriptions] = useState(emergencyData.descriptions)
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [relationship, setRelationship] = useState('')

    // const newDate = new Date(date)
    // const dateForInput = newDate.toISOString().split('T')[0]
    // const dateForServer = newDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    // 2. Click on the Add Allergy Button, send the collected data to server using AllergyService
    async function updateEmergency() {
        if (typeof patientId === 'string') {
            const response = await emergencyService.updateEmergency(patientId as string, props.emergencyId, {
                name,
                email,
                gender,
                address,
                phone,
                relationship
            })
            if (response && response.status && response.status.code === 200) {
                props.onEmergencyEdited()

                // Fire event
                if (typeof window !== 'undefined') {
                    const event = new Event('emergencyEdited')
                    window.dispatchEvent(event)
                }

                // @ts-ignore
            } else if (res?.error === 400) {
                setShouldShowError(true)
                setTimeout(() => {
                    setShouldShowError(false)
                }, 5000)
            }
        }
    }

    const cancelUpdate = () => props.onCancelEditing()

    return (
        <div className={`updateBox animated fadeIn ${s.addPatient}`}>
            <form role="form" className={addDoctorStyle.addDoctor}>
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                           type="text" placeholder="Input name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder="Input email"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}
                           placeholder="Input address"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)}
                           placeholder="Input phone"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Relationship</label>
                    <input type='text' value={relationship} onChange={(e) => setRelationship(e.target.value)}
                           placeholder="Input relationship"
                           className="form-control"/>
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
            </form>
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Invalid input
                </div>
            </div>}
            <button className="btn btn-primary btn-sm" onClick={updateEmergency}>
                <>Update Emergency</>
            </button>
            <button className="btn btn-default update" onClick={cancelUpdate}>
                <>Cancel</>
            </button>
        </div>

    )
}
export default EditEmergency