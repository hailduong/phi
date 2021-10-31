import PatientItem from './PatientItem'
import {useEffect, useState} from 'react'
import AddPatient from './AddPatient'
import patientService from '../../services/patients/patientService'
import {TPatientEntity} from '../../services/patients/types'
import s from './index.module.scss'
import {useRouter} from 'next/router'
import adminPatientService from '../../services/adminPatientService/adminPatientService'
import {useIsAdmin} from '../common/SideBar'

const PatientPageContent = () => {

    const isAdmin = useIsAdmin()

    const [data, setData] = useState<TPatientEntity[]>([])
    const {doctorId} = useRouter().query

    const getData = async () => {
        let data
        if (doctorId) {
            data = await adminPatientService.getPatientDoctor(doctorId as string)
        } else {
            data = await patientService.getPatientList()
        }

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

    const toggleAddPatientBox = () => {
        setShowAddPatientForm(!showAddPatientForm)
    }

    const handlePatientAdded = async () => {
        setShowAddPatientForm(false)
        await getData()
    }

    useEffect(() => {
        if (window !== 'undefined') {
            window.addEventListener('patientEdited', () => {
                getData()
            })
            window.addEventListener('patientAdded', () => {
                getData()
            })
        }
    })

    const buttonAdd = showAddPatientForm ? 'btn-default' : 'btn-primary'

    const patientList = data.map(dataItem => <PatientItem onDeletePatient={handleDeletePatient} patientData={dataItem}
                                                          key={dataItem.id}/>)
    return (
        <div className="wrapper wrapper-content animated fadeInUp">
            <div className="row">
                <div className="col-lg-12 tab-seeContent">
                    <div className="ibox">
                        <div className={`${s.boxTitle} ibox-title`}>
                            <h5>Patient List</h5>
                            {!isAdmin && !showAddPatientForm && <div className={`${s.addButton} ibox-tools`}>
                                <a onClick={toggleAddPatientBox}
                                   className={`btn ${buttonAdd}`}>Add Patient</a>
                            </div>}
                            {showAddPatientForm && <AddPatient onCancelAdding={toggleAddPatientBox}
                                                               onPatientAdded={handlePatientAdded}/>}
                        </div>
                        <div className="ibox-content">
                            <div className="patient-list">
                                {patientList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientPageContent