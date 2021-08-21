import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Script from 'next/script'
import React from 'react'
import authService from '../../services/authentication/authService'

type TProps = {
    children: React.ReactNode
}

export default function HeaderFooter(props: TProps) {
    /* Check if not login, return to the login page */
    if (typeof window !== 'undefined') {
        const currentPageIsLoginPage = location.href.includes('/login')
        if (!authService.checkIfUserHasLoggedIn() && !currentPageIsLoginPage) {
            location.assign('/login')
        }
    }

    /* Render */
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
            {props.children}
            <footer className={styles.footer}>
                {/* Main Scripts */}

                <Script strategy={'beforeInteractive'} src="../public/js/jquery-3.1.1.min.js"/>
                <Script strategy={'beforeInteractive'} src="../public/js/bootstrap.min.js"/>
                <Script strategy={'beforeInteractive'} src="../public/js/popper.min.js"/>
                <Script strategy={'beforeInteractive'} src="../public/js/plugins/metisMenu/jquery.metisMenu.js"/>
                <Script strategy={'beforeInteractive'} src="../public/js/plugins/slimscroll/jquery.slimscroll.min.js"/>

                {/* Plugins */}
                <Script strategy={'beforeInteractive'} src="../public/js/inspinia.js"/>
                <Script strategy={'beforeInteractive'} src="../public/js/plugins/pace/pace.min.js"/>
            </footer>
        </div>
    )
}