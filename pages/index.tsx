import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import LeftNavigation from "../components/common/LeftNavigation";
import PageHeading from "../components/common/PageHeading";
import PatientPageContent from "../components/patients";

export default function PatientPage() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Customers</title>
                <meta name="deScription" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <span dangerouslySetInnerHTML={{
                    __html: `<link href="css/bootstrap.min.css" rel="stylesheet"/>
                <link href="font-awesome/css/font-awesome.css" rel="stylesheet"/>
                <link href="css/animate.css" rel="stylesheet"/>
                <link href="css/style.css" rel="stylesheet"/>`
                }}>

                </span>
            </Head>

            <main className={styles.main}>
                <div id="wrapper">
                    <LeftNavigation/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'Patients'}/>
                        <PatientPageContent/>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                {/* Main Scripts */}

                <Script strategy={'beforeInteractive'} src="../public/js/jquery-3.1.1.min.js"/>
                <Script strategy={'afterInteractive'} src="../public/js/popper.min.js"/>
                <Script strategy={'afterInteractive'} src="../public/js/bootstrap.min.js"/>
                <Script strategy={'afterInteractive'} src="../public/js/plugins/metisMenu/jquery.metisMenu.js"/>
                <Script strategy={'afterInteractive'} src="../public/js/plugins/slimscroll/jquery.slimscroll.min.js"/>

                {/* Plugins */}
                <Script src="../public/js/inspinia.js"></Script>
                <Script src="../public/js/plugins/pace/pace.min.js"></Script>

            </footer>
        </div>
    )
}
