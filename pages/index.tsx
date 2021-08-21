import styles from '../styles/Home.module.css'
import LeftNavigation from '../components/common/LeftNavigation'
import PageHeading from '../components/common/PageHeading'
import PatientPageContent from '../components/patients'
import HeaderFooter from '../components/common/HeaderFooter'
// import './externalScripts'

export default function PatientPage() {

    return (
        <HeaderFooter>
            <main className={styles.main}>
                <div id="wrapper">
                    <LeftNavigation/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'Patients'}/>
                        <PatientPageContent/>
                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}
