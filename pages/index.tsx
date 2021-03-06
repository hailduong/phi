import styles from '../styles/Home.module.scss'
import SideBar from '../components/common/SideBar'
import PageHeading from '../components/common/PageHeading'
import PatientPageContent from '../components/patients'
import HeaderFooter from '../components/common/HeaderFooter'
// import './externalScripts'

export default function PatientPage() {

    return (
        <HeaderFooter>
            <main className={styles.main}>
                <div id="wrapper">
                    <SideBar/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'Patients'}/>
                        <PatientPageContent/>
                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}
