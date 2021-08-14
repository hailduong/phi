import DoctorItem from "./DoctorItem";
import {useEffect, useState} from "react";

export type TDoctorData = {
    id: string
    fullname: string
    phone: string
    descriptions: string
}

type TDoctor = TDoctorData[]

const DoctorPatient = () => {

    const [doctorData, setDoctorData] = useState<TDoctor>([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:3000/api/doctors')

            const data = await response.json()
            if (data.status === "200") {
                setDoctorData(data.data)
            }
        }

        getData()
    }, [])

    const doctorList = doctorData.map(doctor => <DoctorItem key={doctor.id} doctorData={doctor}/>)
    return <div>{doctorList}</div>
}

export default DoctorPatient