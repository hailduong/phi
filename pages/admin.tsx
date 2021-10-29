import styles from '../styles/Home.module.scss'
import SideBar from '../components/common/SideBar'
import PageHeading from '../components/common/PageHeading'
import NewsPageContent from "../components/news";
import HeaderFooter from '../components/common/HeaderFooter'
import DoctorPageContent from "../components/admin";
// import './externalScripts'

export default function PatientPage() {

    return (
        <HeaderFooter>
            <main className={styles.main}>
                <div id="wrapper">
                    <SideBar/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'Admin'}/>
                        <DoctorPageContent/>
                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}