import {useEffect, useState} from 'react'
import patientService from '../../services/patients/patientService'
import {useRouter} from 'next/router'
import HeaderFooter from '../../components/common/HeaderFooter'
import styles from '../../styles/Home.module.scss'
import SideBar from '../../components/common/SideBar'
import PageHeading from '../../components/common/PageHeading'
import PatientTabHeading from '../../components/patient-details/PatientTabHeading'
import {TPatientDataResponse, TPatientEntity} from '../../services/patients/types'
import PatientHeading from '../../components/patients/PatientHeading'
import HistoryPatient from '../../components/patient-details/History'
import Allergy from '../../components/patient-details/Allergy'
import EventPatient from '../../components/patient-details/Events'
import PrescriptionPatient from '../../components/patient-details/Prescription'
import Emergency from '../../components/patient-details/Emergency'
import adminPatientService from '../../services/adminPatientService/adminPatientService'

export default function PatientDetailsPage() {

    /* Get initial data */
    const [currentPatient, setCurrentPatient] = useState<TPatientEntity | null>(null)
    const router = useRouter()
    const {patientId} = router.query
    const {doctorId} = useRouter().query
    useEffect(() => {
        (async () => {
            let data: TPatientDataResponse
            if (doctorId) {
                data = await adminPatientService.getPatientListByDoctor(doctorId as string)
            } else {
                data = await patientService.getPatientListByCurrentDoctor()
            }
            if (data?.status.code === 200) {
                const id = parseInt(patientId as string, 10)
                const currentPatientData = data.data.find(item => item.id === id)
                currentPatientData && setCurrentPatient(currentPatientData)
            }
        })()
    }, [patientId])

    /* Tabbing */
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    /* Render */
    return (
        <HeaderFooter>
            <main className={styles.main}>
                <div id="wrapper">
                    <SideBar/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'Patient Details'}/>
                        <div className="wrapper wrapper-content animated fadeInUp">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-12 tab-seeContent">
                                            <PatientHeading
                                                patientName={`${currentPatient?.firstName || ''} ${currentPatient?.lastName || ''}`}
                                                emailPatient={`${currentPatient?.email}`}/>

                                            <div className="panel blank-panel m-t-sm">
                                                <div className="panel-heading">
                                                    <div className="panel-options">
                                                        <PatientTabHeading
                                                            onSelectTab={(tabIndex: number) => setActiveTabIndex(tabIndex)}/>
                                                    </div>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="tab-content">
                                                        {activeTabIndex === 0 && <HistoryPatient/>}
                                                        {/*{activeTabIndex === 1 && <DoctorPatient/>}*/}
                                                        {activeTabIndex === 1 && <Allergy/>}
                                                        {activeTabIndex === 2 && <EventPatient/>}
                                                        {activeTabIndex === 3 && <PrescriptionPatient/>}
                                                        {activeTabIndex === 4 && <Emergency/>}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}
