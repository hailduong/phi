import DoctorPatientEdit from "./DoctorPatientEdit";

type TDoctor = {
    scr: string
    name: string
    phone: string
    description: string
}[]

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
    const doctorList = data.map(doctor => {
            return (
                <div className="feed-element" key={doctor.name}>
                    <a href="#" className="float-left">
                        <img width={"29px"} height={"29px"} src={doctor.scr}/>
                    </a>
                    <div className="media-body">
                        <h4> {doctor.name}</h4>
                        <br/>
                    </div>
                    <div>
                        Phone: {doctor.phone} <br/>
                        {doctor.description}
                    </div>
                    <DoctorPatientEdit/>
                </div>
            )
        }
    )
    return <div>{doctorList}</div>
}

export default DoctorPatient