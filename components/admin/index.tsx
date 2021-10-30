import {useEffect, useState} from 'react'
import s from '../patients/index.module.scss'
import DoctorItem from './DoctorItem'
import {TDoctorEntity} from '../../services/adminService/adminTypes'
import adminService from '../../services/adminService/adminService'
import {useAppDispatch} from '../../store/hook'
import AddDoctor from './AddDoctor'

const DoctorPageContent = () => {
    const dispatch = useAppDispatch()
    const [doctorList, setDoctorList] = useState<TDoctorEntity[]>([])

    const getData = async () => {
        const data = await adminService.getDoctorList()
        if (data.status.code === 200) {
            setDoctorList(data.data)
        }
    }

    // const getDoctorList = async () => {
    //     // const doctorList = await adminService.getDoctorList()
    //     // if (doctorList.status.code === 200) {
    //     //     setDoctor(doctorList.data)
    //     // }
    //     try {
    //         const result = await dispatch(fetchDoctorList())
    //         unwrapResult(result)
    //     } catch (e) {
    //         console.log(e)
    // }

    const handleDeleteDoctor = async (doctorId: number) => {
        const response = await adminService.deleteDoctor(doctorId)

        if (response?.status.code === 200) {
            getData()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const [showAddDoctorForm, setShowAddDoctorForm] = useState(false)

    const toggleAddDoctorBox = () => {
        setShowAddDoctorForm(!showAddDoctorForm)
    }

    const handleDoctorAdded = async () => {
        setShowAddDoctorForm(false)
        await getData()
    }

    const buttonAdd = showAddDoctorForm ? 'btn-default' : 'btn-primary'

    const listDoctor = doctorList.map(dataItem => <DoctorItem onDeleteDoctor={handleDeleteDoctor}
                                                              doctorData={dataItem} key={dataItem.id}/>)
    return (
        <div className="wrapper wrapper-content animated fadeInUp">
            <div className="row">
                <div className="col-lg-12 tab-seeContent">
                    <div className="ibox">
                        <div className={`${s.boxTitle} ibox-title`}>
                            <h5>Doctors</h5>
                            {showAddDoctorForm ? null :
                                <div className={`${s.addButton} ibox-tools`}>
                                    <a onClick={toggleAddDoctorBox}
                                       className={`btn ${buttonAdd}`}>Add Doctor</a>
                                </div>}
                            {showAddDoctorForm ? <AddDoctor onCancelAdding={toggleAddDoctorBox}
                                                            onDoctorAdded={handleDoctorAdded}/> : null}
                        </div>
                        <div className="ibox-content">
                            <div className="patient-list">
                                <table className="table table-hover">
                                    <tbody>
                                    {listDoctor}
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


export default DoctorPageContent