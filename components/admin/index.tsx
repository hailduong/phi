import {useEffect, useState} from 'react'
import s from '../patients/index.module.scss'
import DoctorItem from './DoctorItem'
import {TDoctorEntity} from '../../services/adminService/adminTypes'
import adminService from '../../services/adminService/adminService'

const DoctorPageContent = () => {

    const [doctorList, setDoctorList] = useState<TDoctorEntity[]>([])

    const getData = async () => {
        const data = await adminService.getDoctorList()
        if (data.status.code === 200) {
            setDoctorList(data.data)
        }

    }
    // const [news, setNews] = useState<TNewsEntity[]>([])
    //
    // const getData = async () => {
    //     const data = await newsService.getNews()
    //     if (data?.status?.code === 200) {
    //         setNews(data.data)
    //     }
    // }
    //
    // const handleDeleteNews = async (newsId: number) => {
    //     const response = await newsService.deleteNews(newsId)
    //
    //     if (response?.status.code === 200) {
    //         getData()
    //     }
    // }

    useEffect(() => {
        getData()
    }, [])

    // const [showAddNewsForm, setShowAddNewsForm] = useState(false)
    //
    // const toggleAddNewsBox = () => {
    //     setShowAddNewsForm(!showAddNewsForm)
    // }
    //
    // const handleNewsAdded = async () => {
    //     setShowAddNewsForm(false)
    //     await getData()
    // }

    // const buttonAdd = showAddNewsForm ? 'btn-default' : 'btn-primary'

    const listDoctor = doctorList.map(dataItem => <DoctorItem doctorData={dataItem} key={dataItem.id}/>)
    return (
        <div className="wrapper wrapper-content animated fadeInUp">
            <div className="row">
                <div className="col-lg-12 tab-seeContent">
                    <div className="ibox">
                        <div className={`${s.boxTitle} ibox-title`}>
                            <h5>Doctors</h5>
                            {/*{showAddNewsForm ? null :*/}
                            {/*    <div className={`${s.addButton} ibox-tools`}>*/}
                            {/*        <a onClick={toggleAddNewsBox}*/}
                            {/*           className={`btn ${buttonAdd}`}>Add News</a>*/}
                            {/*    </div>}*/}
                            {/*{showAddNewsForm ? <AddDoctor onCancelAdding={toggleAddNewsBox}*/}
                            {/*                              onNewsAdded={handleNewsAdded}/> : null}*/}
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