import PatientItem from "./PatienItem";
import {useEffect, useState} from "react";

const PatientPageContent = () => {

    type TData = {
        name: string
        phoneNumber: string
        emergencyNumber: string
    }[]


    const [data, setData] = useState([])
    useEffect(() => {
        // Get data
        const getData = async () => {
            const data = await fetch('/api/patients')
            const jsonData = await data.json()
            setData(jsonData)
        }
        getData()

    }, [])

    const patientList = data.map(dataItem => {
        const {emergencyNumber, name, phoneNumber} = dataItem
        return <PatientItem key={phoneNumber} name={name} emergencyNumber={emergencyNumber} phoneNumber={phoneNumber}/>
    })

    return (
        <div className="wrapper wrapper-content animated fadeInUp">
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>All projects assigned to this account</h5>
                            <div className="ibox-tools">
                                <a href="" className="btn btn-primary btn-xs">Create new project</a>
                            </div>
                        </div>
                        <div className="ibox-content">

                            <div className="project-list">

                                <table className="table table-hover">
                                    <tbody>
                                    {patientList}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientPageContent