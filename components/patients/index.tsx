import PatientItem from './PatientItem'
import {useEffect, useState} from 'react'
import AddPatient from './AddPatient'
import patientService from '../../services/patients/patientService'
import {TPatientEntity} from '../../services/patients/types'

const PatientPageContent = () => {

    const [data, setData] = useState<TPatientEntity[]>([])

    const getData = async () => {
        const data = await patientService.getPatientList()
        if (data?.status.code === 200) {
            setData(data.data)
        }
    }

    const handleDeletePatient = async (patientId: number) => {
        // Call API to server to delete
        const response = await patientService.deletePatient(patientId)

        // Re-fetch data after successful deletion
        if (response?.status.code === 200) {
            getData()
        }

    }

    useEffect(() => {
        // Get data
        getData()

    }, [])

    const [showAddPatientForm, setShowAddPatientForm] = useState(false)

    const handleAddPatient = () => {
        setShowAddPatientForm(!showAddPatientForm)
    }

    const handlePatientAdded = async () => {
        setShowAddPatientForm(false)
        await getData()
    }

    const patientList = data.map(dataItem => <PatientItem onDeletePatient={handleDeletePatient} patientData={dataItem}
                                                          key={dataItem.id}/>)
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
                                {showAddPatientForm ? <AddPatient onPatientAdded={handlePatientAdded}/> : null}
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