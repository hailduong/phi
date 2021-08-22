import {useEffect, useState} from 'react'
import patientService from '../../services/patients/patientService'
import {useRouter} from 'next/router'
import HeaderFooter from '../../components/common/HeaderFooter'
import styles from '../../styles/Home.module.css'
import LeftNavigation from '../../components/common/LeftNavigation'
import PageHeading from '../../components/common/PageHeading'
import PatientTabHeading from '../../components/patient-details/PatientTabHeading'
import Tab1 from '../../components/patient-details/HistoryPatient/Tab1'
import Tab2 from '../../components/patient-details/DoctorPatient/Tab2'
import Tab3 from '../../components/patient-details/AllergyPatient/Tab3'
import Tab4 from '../../components/patient-details/Events/Tab4'
import Tab5 from '../../components/patient-details/Prescription/Tab5'
import {TPatientEntity} from '../../services/patients/types'
import PatientHeading from '../../components/patients/PatientHeading'

export default function PatientDetailsPage() {

    /* Get initial data */
    const [currentPatient, setCurrentPatient] = useState<TPatientEntity | null>(null)
    const router = useRouter()
    const {patientId} = router.query

    useEffect(() => {
        (async () => {
            const data = await patientService.getPatientList()
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
                    <LeftNavigation/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'Patient Details'}/>
                        <div className="wrapper wrapper-content animated fadeInUp">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox">
                                        <div className="ibox-content">
                                            <div className="row">
                                                <div className="col-lg-12 tab-seeContent">
                                                    <PatientHeading
                                                        patientName={`${currentPatient?.firstName || ''} ${currentPatient?.lastName || ''}`}/>
                                                    <div className="row m-t-sm">
                                                        <div className="col-lg-12">
                                                            <div className="panel blank-panel">
                                                                <div className="panel-heading">
                                                                    <div className="panel-options">
                                                                        <PatientTabHeading
                                                                            onSelectTab={(tabIndex: number) => setActiveTabIndex(tabIndex)}/>
                                                                    </div>
                                                                </div>
                                                                <div className="panel-body">
                                                                    <div className="tab-content">
                                                                        {activeTabIndex === 0 && <Tab1/>}
                                                                        {activeTabIndex === 1 && <Tab2/>}
                                                                        {activeTabIndex === 2 && <Tab3/>}
                                                                        {activeTabIndex === 3 && <Tab4/>}
                                                                        {activeTabIndex === 4 && <Tab5/>}
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
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}
