import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import LeftNavigation from "../components/common/LeftNavigation";
import PageHeading from "../components/common/PageHeading";

export default function PatientDetailsPage() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Customers</title>
                <meta name="deScription" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <span dangerouslySetInnerHTML={{
                    __html: `<link href="/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="/font-awesome/css/font-awesome.css" rel="stylesheet"/>
                <link href="/css/animate.css" rel="stylesheet"/>
                <link href="/css/style.css" rel="stylesheet"/>`
                }}>

                </span>
            </Head>

            <main className={styles.main}>
                <div id="wrapper">
                    <LeftNavigation/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={"Patient Details"}/>
                        <div className="wrapper wrapper-content animated fadeInUp">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox">
                                        <div className="ibox-content">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="m-b-md">
                                                        <h2 className="patient-name">Alex Smith</h2>
                                                    </div>
                                                    <div className="row m-t-sm">
                                                        <div className="col-lg-12">
                                                            <div className="panel blank-panel">
                                                                <div className="panel-heading">
                                                                    <div className="panel-options">
                                                                        <ul className="nav nav-tabs">
                                                                            <li><a className="nav-link active show"
                                                                                   href="#tab-1"
                                                                                   data-toggle="tab">History</a>
                                                                            </li>
                                                                            <li><a className="nav-link"
                                                                                   href="#tab-2"
                                                                                   data-toggle="tab">Doctors</a>
                                                                            </li>
                                                                            <li><a className="nav-link"
                                                                                   href="#tab-3"
                                                                                   data-toggle="tab">Alergies</a>
                                                                            </li>
                                                                            <li><a className="nav-link"
                                                                                   href="#tab-4"
                                                                                   data-toggle="tab">Events</a></li>
                                                                            <li><a className="nav-link"
                                                                                   href="#tab-5"
                                                                                   data-toggle="tab">Prescriptions</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="panel-body">
                                                                    <div className="tab-content">
                                                                        <div className="tab-pane active show"
                                                                             id="tab-1">
                                                                            <div className="feed-activity-list">
                                                                                <div className="feed-element">
                                                                                    <a href="#"
                                                                                       className="float-left">
                                                                                        <img alt="image"
                                                                                             src="/img/icon-history.png"/>
                                                                                    </a>
                                                                                    <div className="media-body ">
                                                                                        <div
                                                                                            className="float-right from-toDate">12/2/2020
                                                                                            - 13/2/2019
                                                                                        </div>
                                                                                        <h4> Lịch sử bệnh án 1</h4>
                                                                                        <br/>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        Lorem Ipsum is simply dummy text
                                                                                        of the printing and typesetting
                                                                                        industry. Lorem Ipsum
                                                                                        has been the industry's standard
                                                                                        dummy text ever since the
                                                                                        1500s. Over the years, sometimes
                                                                                        by accident, sometimes
                                                                                        on purpose (injected humour and
                                                                                        the like).
                                                                                    </div>
                                                                                </div>
                                                                                <div className="feed-element">
                                                                                    <a href="#"
                                                                                       className="float-left">
                                                                                        <img alt="image"
                                                                                             src="/img/icon-history.png"/>
                                                                                    </a>
                                                                                    <div className="media-body ">
                                                                                        <div
                                                                                            className="float-right from-toDate">12/2/2020
                                                                                            - 13/2/2019
                                                                                        </div>
                                                                                        <h4> Lịch sử bệnh án 2</h4>
                                                                                        <br/>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        Lorem Ipsum is simply dummy
                                                                                        text
                                                                                        of the printing and
                                                                                        typesetting
                                                                                        industry. Lorem Ipsum
                                                                                        has been the industry's
                                                                                        standard
                                                                                        dummy text ever since the
                                                                                        1500s.
                                                                                        Over the years,
                                                                                        sometimes by accident,
                                                                                        sometimes
                                                                                        on purpose (injected humour
                                                                                        and
                                                                                        the like).
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-pane"
                                                                             id="tab-2">
                                                                            <div className="feed-activity-list">
                                                                                <div className="feed-element">
                                                                                    <a href="#" className="float-left">
                                                                                        <img
                                                                                            src="https://img.icons8.com/ios/50/000000/doctor-male.png"/>
                                                                                    </a>
                                                                                    <button type="button"
                                                                                            className="btn rounded-circle float-right add-button">
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="16" height="16"
                                                                                            fill="currentColor"
                                                                                            className="bi bi-plus-lg"
                                                                                            viewBox="0 0 16 16">
                                                                                            <path
                                                                                                d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                                                                        </svg>
                                                                                    </button>
                                                                                    <div className="media-body ">
                                                                                        <h4> Bs. Nguyen Van An</h4>
                                                                                        <br/>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        Phone: 0938 54 11 74 <br/>
                                                                                        Over the years,
                                                                                        sometimes by accident,
                                                                                        sometimes
                                                                                        on purpose (injected humour
                                                                                        and
                                                                                        the like).
                                                                                    </div>
                                                                                    <div className="row pt-2">
                                                                                        <div
                                                                                            className="col-sm-6 b-r pt-2">
                                                                                            <form role="form">
                                                                                                <div
                                                                                                    className="form-group">
                                                                                                    <label>Name</label>
                                                                                                    <input type="text"
                                                                                                           placeholder=""
                                                                                                           className="form-control"/>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="form-group">
                                                                                                    <label>Phone</label>
                                                                                                    <input type="number"
                                                                                                           placeholder=""
                                                                                                           className="form-control"/>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <button
                                                                                                        className="btn btn-sm btn-primary float-left m-t-n-xs"
                                                                                                        type="submit">
                                                                                                        <strong>Update</strong>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-sm-6 b-r pt-2">
                                                                                            <form role="form">
                                                                                                <div
                                                                                                    className="form-group">
                                                                                                    <label>Description</label>
                                                                                                    <textarea rows={4}
                                                                                                              placeholder=""
                                                                                                              className="form-control"/>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="feed-activity-list">
                                                                                <div className="feed-element pt-3">
                                                                                    <a href="#" className="float-left">
                                                                                        <img
                                                                                            src="https://img.icons8.com/ios/50/000000/doctor-male.png"/>
                                                                                    </a>
                                                                                    <button type="button"
                                                                                            className="btn btn-outline-dark float-right">
                                                                                        Edit
                                                                                    </button>
                                                                                    <div className="media-body ">
                                                                                        <h4> Bs. Tran Thi Bich Nga</h4>
                                                                                        <br/>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        Phone: 0938 54 11 74 <br/>
                                                                                        Over the years,
                                                                                        sometimes by accident,
                                                                                        sometimes
                                                                                        on purpose (injected humour
                                                                                        and
                                                                                        the like).
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
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                {/* Main Scripts */}

                <Script strategy={'beforeInteractive'} src="/js/jquery-3.1.1.min.js"/>
                <Script strategy={'afterInteractive'} src="/js/popper.min.js"/>
                <Script strategy={'afterInteractive'} src="/js/bootstrap.min.js"/>
                <Script strategy={'afterInteractive'} src="/js/plugins/metisMenu/jquery.metisMenu.js"/>
                <Script strategy={'afterInteractive'} src="/js/plugins/slimscroll/jquery.slimscroll.min.js"/>

                {/* Plugins */}
                <Script src="js/inspinia.js"></Script>
                <Script src="js/plugins/pace/pace.min.js"></Script>

            </footer>
        </div>
    )
}
