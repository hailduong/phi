import Link from "next/link";
import {scripthost} from "@typescript-eslint/scope-manager/dist/lib/scripthost";


const LeftNavigation = () => {
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                                        <span data-toggle="dropdown" className="dropdown-toggle">
                                            <span className="block m-t-xs font-bold">Example user</span>
                                            <span className="text-muted text-xs block">menu
                                                    <b className="caret"/>
                                                </span>
                                        </span>
                            {/*<ul className="dropdown-menu animated fadeInRight m-t-xs">*/}
                            {/*    <li>*/}
                            {/*        <Link href={'/'}>*/}
                            {/*            <a className="dropdown-item">Logout</a>*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>
                        {/*<div className="logo-element">*/}
                        {/*    IN+*/}
                        {/*</div>*/}
                    </li>
                    <li className="active">
                        <Link href="/">
                            <a>
                                <i className="fa fa-th-large"/>
                                <span className="nav-label">Patients</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/patient-details">
                            <a>
                                <i className="fa fa-th-large"/>
                                <span className="nav-label">Patient Details</span>
                            </a>
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default LeftNavigation