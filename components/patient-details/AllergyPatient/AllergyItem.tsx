import {TAllergyData} from './AllergyPatient'
import Image from 'next/image'

type TProps = {
    allergyData: TAllergyData
    onDeleteAllergy: (id: number) => void
}

const AllergyItem = (props: TProps) => {
    const {allergyData, onDeleteAllergy} = props

    const newDate = new Date(allergyData.date * 1000)
    const dateForInput = newDate.toISOString().split('T')[0]

    return (
        <div className="feed-element grid-container" key={allergyData.id}>
            <div>
                <a href="#" className="float-left">
                    <Image alt="icon" width={29} height={29} src="/img/icon-history.png"/>
                </a>
                <h4>{allergyData.id} {allergyData.name}</h4>
                <div className='list-id'>{allergyData.descriptions}</div>
            </div>
            <div className="project-actions">
                <a className="btn btn-white btn-sm">
                    <i className="fa fa-pencil"/> Edit</a>
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeleteAllergy(allergyData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>
                <div>{dateForInput}</div>
            </div>
            {/*{isVisible ? <DoctorPatientEdit/> : null}*/}
        </div>
    )
}

export default AllergyItem