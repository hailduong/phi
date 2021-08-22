import PatientItem from './PatientItem'
import {useEffect, useState} from 'react'
import AddPatient from './AddPatient'
import patientService from '../../services/patients/patientService'
import { TPatientDataResponse, TPatientEntity} from '../../services/patients/types'

const PatientPageContent = () => {

    const [data, setData] = useState<TPatientEntity[]>([])
    useEffect(() => {
        // Get data
        (async () => {
            const data: TPatientDataResponse = await patientService.getPatientList()
            if (data.status.code === 200) {
                setData(data.data)
            }
        })()


    }, [])

    const [addPatient, setAddPatient] = useState(false)

    const handleAddPatient = () => {
        setAddPatient(!addPatient)
    }

    const patientList = data.map(dataItem => <PatientItem patientData={dataItem} key={dataItem.id}/>)
    return (
        <div className="wrapper wrapper-content animated fadeInUp">
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <div className="ibox-title">
                            <div className="ibox-tools">
                                <a onClick={handleAddPatient} className="btn btn-primary">Add Patient</a>
                            </div>
                            <div className="addPatient">
                                {addPatient ? <AddPatient/> : null}
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