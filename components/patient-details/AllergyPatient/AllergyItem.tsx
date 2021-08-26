import {TAllergyData} from './AllergyPatient'
import Image from 'next/image'

type TProps = {
    allergyData: TAllergyData
}

const AllergyItem = (props: TProps) => {
    const {allergyData} = props
    return <div className="feed-element" key={allergyData.id}>
        <a href="#" className="float-left">
            <Image alt="icon" width={29} height={29} src="https://img.icons8.com/windows/32/000000/allergies.png"/>
        </a>
        {/*<button type="button" onClick={handleClick} className="btn btn-outline-dark float-right">*/}
        {/*    Edit*/}
        {/*</button>*/}
        <div className="media-body"><h4> {allergyData.id}</h4><br/></div>
        <div>Allergy: {allergyData.name} <br/>{allergyData.descriptions}</div>
        {/*{isVisible ? <DoctorPatientEdit/> : null}*/}
    </div>
}

export default AllergyItem