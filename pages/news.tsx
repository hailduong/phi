import styles from '../styles/Home.module.scss'
import LeftNavigation from '../components/common/LeftNavigation'
import PageHeading from '../components/common/PageHeading'
import NewsPageContent from "../components/news";
import HeaderFooter from '../components/common/HeaderFooter'
// import './externalScripts'

export default function PatientPage() {

    return (
        <HeaderFooter>
            <main className={styles.main}>
                <div id="wrapper">
                    <LeftNavigation/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'News'}/>
                        <NewsPageContent/>
                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}
