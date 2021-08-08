import {useState} from "react";
import DoctorPatientEdit from "../DoctorPatientEdit";

import {TDoctorData} from "./DoctorPatient";

type TProps = {
    doctorData: TDoctorData
}
const DoctorItem = (props: TProps) => {
    const {doctorData} = props

    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        setIsVisible(!isVisible)
    }

    return <div className="feed-element" key={doctorData.name}>
        <a href="#" className="float-left">
            <img width={"29px"} height={"29px"} src={doctorData.scr}/>
        </a>
        <button type="button" onClick={handleClick} className="btn btn-outline-dark float-right">
            Edit
        </button>
        <div className="media-body"><h4> {doctorData.name}</h4><br/></div>
        <div>Phone: {doctorData.phone} <br/>{doctorData.description}</div>
        {isVisible ? <DoctorPatientEdit/> : null}
    </div>
}

export default DoctorItem