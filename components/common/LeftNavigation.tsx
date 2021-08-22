import Link from 'next/link'
import authService from '../../services/authentication/authService'
import {useEffect, useState} from 'react'
import {TUserEntity} from '../../services/authentication/authType'


const LeftNavigation = () => {

    const [user, setUser] = useState<TUserEntity | null>(null)
    useEffect(() => {
        setUser(authService.getUser())
    }, [])

    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                                        <span data-toggle="dropdown" className="dropdown-toggle">
                                            <span
                                                className="block m-t-xs font-bold">{user?.firstName} {user?.lastName}</span>
                                            <span className="text-muted text-xs block">{user?.role}
                                                <b className="caret"/>
                                                </span>
                                        </span>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li>
                                    <Link href={'/'}>
                                        <a className="dropdown-item">My Profile</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/logout'}>
                                        <a className="dropdown-item">Logout</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            PHI
                        </div>
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