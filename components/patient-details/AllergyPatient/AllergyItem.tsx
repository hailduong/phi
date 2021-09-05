import {TAllergyData} from './AllergyPatient'
import Image from 'next/image'
import {useState} from "react";
import EditAllergy from "./EditAllergy";

type TProps = {
    allergyData: TAllergyData
    onDeleteAllergy: (id: number) => void
}

const AllergyItem = (props: TProps) => {
    const {allergyData, onDeleteAllergy} = props

    const newDate = new Date(allergyData.date * 1000)
    const dateForInput = newDate.toISOString().split('T')[0]

    const [showEdit, setShowEdit] = useState(false)
    const handleEdit = () => {
        setShowEdit(!showEdit)
    }

    const handleEdited = () => {
        setShowEdit(false)
    }

    return (
        <div className="feed-element grid-container" key={allergyData.id}>
            <div>
                <a href="#" className="float-left">
                    <Image alt="icon" width={29} height={29} src="/img/icons8-allergies-32.png"/>
                </a>
                <div className="media-body">
                    <h4>{allergyData.name}</h4>
                </div>
                <div>Description: {allergyData.descriptions}</div>
            </div>
            <div className="project-actions">
                <div className="media-body from-toDate">
                    <div>{dateForInput}</div>
                </div>
                <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/>{showEdit ? ' Cancel' : ' Edit'}</a>
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeleteAllergy(allergyData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>

            </div>
            <div className='edit-patient'>
                {showEdit ? <EditAllergy allergyId={allergyData.id} onAllergyEdited={handleEdited}/> : null}
            </div>
        </div>
    )
}

export default AllergyItem