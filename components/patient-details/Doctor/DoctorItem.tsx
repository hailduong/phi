import {useState} from 'react'
import DoctorPatientEdit from './DoctorPatientEdit'
import Image from 'next/image'
import {TDoctorData} from './index'

type TProps = {
    doctorData: TDoctorData
}
const DoctorItem = (props: TProps) => {
    const {doctorData} = props

    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        setIsVisible(!isVisible)
    }

    return <div className="feed-element" key={doctorData.id}>
        <a href="#" className="float-left">
            <Image width={'29px'} height={'29px'} src={'https://img.icons8.com/ios/50/000000/doctor-male.png'}
                   alt={'Doctor icon'}/>
        </a>
        <button type="button" onClick={handleClick} className="btn btn-outline-dark float-right">
            Edit
        </button>
        <div className="media-body"><h4> {doctorData.fullname}</h4><br/></div>
        <div>Phone: {doctorData.phone} <br/>{doctorData.descriptions}</div>
        {isVisible ? <DoctorPatientEdit/> : null}
    </div>
}

export default DoctorItem