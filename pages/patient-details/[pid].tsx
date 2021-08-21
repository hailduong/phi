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

export default function PatientDetailsPage() {

    const [dataPatient, setDataPatient] = useState<TPatientEntity[]>([])
    const router = useRouter()
    const {pid} = router.query

    useEffect(() => {
        // Get dataPatient
        (async () => {
            const data = await patientService.getPatientList()
            if (data.status.code === 200) {
                setDataPatient(data.data)
            }
        })()
    }, [])

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
                                                    {/*<PatientHeading patientData1={}/>*/}
                                                    <div className="row m-t-sm">
                                                        <div className="col-lg-12">
                                                            <div className="panel blank-panel">
                                                                <div className="panel-heading">
                                                                    <div className="panel-options">
                                                                        <PatientTabHeading/>
                                                                    </div>
                                                                </div>
                                                                <div className="panel-body">
                                                                    <div className="tab-content">
                                                                        <Tab1/>
                                                                        <Tab2/>
                                                                        <Tab3/>
                                                                        <Tab4/>
                                                                        <Tab5/>
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
