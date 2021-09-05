import {TPresData} from './index'
import Image from 'next/image'
import {useState} from 'react'
import EditPrescription from './EditPrescription'
import s from './index.module.scss'

type TProps = {
    presData: TPresData
    onDeletePrescription: (id: number) => void
}

const PrescriptionItem = (props: TProps) => {
    const {presData, onDeletePrescription} = props

    const newDate = new Date(presData.date * 1000)
    const dateForInput = newDate.toISOString().split('T')[0]

    const [showEdit, setShowEdit] = useState(false)
    const handleEdit = () => {
        setShowEdit(!showEdit)
    }

    const handleEdited = () => {
        setShowEdit(false)
    }

    return (
        <div className="grid-container feed-element" key={presData.id}>
            <div>
                <a href="#" className={`float-left mr-1 ${s.icon}`}>
                    <Image alt="image" height={20} width={20} src={'/img/treatment-plan.png'}/>
                </a>
                <div className="media-body">
                    <h4> {presData.name} </h4>
                </div>
                <div>{presData.descriptions}</div>
            </div>
            <div className="project-actions">
                <div className="media-body from-toDate">{dateForInput}</div>
                <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/> {showEdit ? ' Cancel' : ' Edit'}</a>
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeletePrescription(presData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>
            </div>

            {showEdit ? <EditPrescription prescriptionId={presData.id} onPrescriptionEdited={handleEdited}/> : null}

        </div>
    )
}

export default PrescriptionItem