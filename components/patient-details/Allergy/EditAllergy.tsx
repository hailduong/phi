import {useRouter} from 'next/router'
import {useState} from 'react'
import allergyService from '../../../services/allergyService/allergyService'

type TProps = {
    allergyId: number
    onAllergyEdited: () => void
    onCancelEditing: () => void
}

const EditAllergy = (props: TProps) => {

    const router = useRouter()
    const {patientId} = router.query
    // 1. Get form data via state + onChange
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date().toISOString())
    const [descriptions, setDescriptions] = useState('')

    const newDate = new Date(date)
    const dateForInput = newDate.toISOString().split('T')[0]
    const dateForServer = newDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    // 2. Click on the Add Allergy Button, send the collected data to server using AllergyService
    async function updateAllergy() {
        if (typeof patientId === 'string') {
            const response = await allergyService.updateAllergy(patientId as string, props.allergyId, {
                name,
                date: dateForServer,
                descriptions,
            })
            if (response && response.status && response.status.code === 200) {
                props.onAllergyEdited()

                // Fire event
                if (typeof window !== 'undefined') {
                    const event = new Event('allergyEdited')
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
        <div className="updateBox animated fadeIn">
            <div className="row pt-2">
                <div className="col-sm-6 pt-2">
                    <form role="form">
                        <div className="form-group">
                            <label>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)}
                                   type="text" placeholder="Enter allergy name" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Descriptions</label>
                            <input value={descriptions} onChange={(e) => setDescriptions(e.target.value)}
                                   type="text" placeholder="Enter description"
                                   className="form-control"/>
                        </div>
                    </form>
                </div>
                <div className="col-sm-6 pt-2">
                    <form role="form">
                        <div className="form-group">
                            <label>Date</label>
                            <input value={dateForInput}
                                   onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                                   type="date" placeholder="Enter starting date"
                                   className="form-control"/>
                        </div>
                    </form>
                </div>
                {shouldShowError && <div className="col-sm-12">
                    <div className="alert alert-danger" role="alert">
                        Invalid input
                    </div>
                </div>}
                <button className="btn btn-primary btn-sm float-left update" onClick={updateAllergy}>
                    <>Update Allergy</>
                </button>
                <button className="btn btn-default float-left update" onClick={cancelUpdate}>
                    <>Cancel</>
                </button>
            </div>
        </div>
    )
}
export default EditAllergy