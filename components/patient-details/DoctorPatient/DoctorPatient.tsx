import DoctorItem from "./DoctorItem";

export type TDoctorData = {
    scr: string
    name: string
    phone: string
    description: string
}

type TDoctor = TDoctorData[]

const data: TDoctor = [
    {
        scr: "https://img.icons8.com/ios/50/000000/doctor-male.png",
        name: "Bs. Nguyen Van An",
        phone: "0938 54 11 74",
        description: "Over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        scr: "https://img.icons8.com/ios/50/000000/doctor-male.png",
        name: "Bs. Tran Thi Bich Nga",
        phone: "0938 54 11 74",
        description: "Over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
]

const DoctorPatient = () => {

    const doctorList = data.map(doctor => <DoctorItem key={doctor.name} doctorData={doctor}/>)
    return <div>{doctorList}</div>
}

export default DoctorPatient