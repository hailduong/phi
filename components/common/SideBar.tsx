import Link from 'next/link'
import authService from '../../services/authentication/authService'
import {useEffect, useState} from 'react'
import {TDoctorInfoEntity} from '../../services/authentication/authType'

export function useIsAdmin() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    useEffect(() => {
        const user = authService.getUser()
        const roleIsAdmin = user?.role === 'admin'
        setIsAdmin(roleIsAdmin)
    }, [])
    return isAdmin
}

const SideBar = () => {

    /* Get user info */
    const [doctorInfo, setDoctorInfo] = useState<TDoctorInfoEntity | null>(null)

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await authService.getDoctorBasicInfo()
            !!data && setDoctorInfo(data)
        }
        getUserInfo()
    }, [])

    const isAdmin = useIsAdmin()

    /* Logout */
    function logout() {
        authService.logout()
    }

    /* Render */
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                                        <span data-toggle="dropdown" className="dropdown-toggle">
                                            <span
                                                className="block m-t-xs font-bold">{doctorInfo?.firstName} {doctorInfo?.lastName}</span>
                                            <span className="text-muted text-xs block">{doctorInfo?.role}
                                                <b className="caret"/>
                                                </span>
                                        </span>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li>
                                    <a className="dropdown-item" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            PHI
                        </div>
                    </li>
                    <li className="active">
                        {
                            isAdmin ? <Link href="/doctors">
                                <a>
                                    <i className="fa fa-users"/>
                                    <span className="nav-label">Doctors</span>
                                </a>
                            </Link> : <Link href="/">
                                <a>
                                    <i className="fa fa-th-large"/>
                                    <span className="nav-label">Patients</span>
                                </a>
                            </Link>
                        }
                        {
                            isAdmin && <Link href="/news">
                                <a>
                                    <i className="fa fa-bullhorn"/>
                                    <span className="nav-label">News</span>
                                </a>
                            </Link>
                        }
                        <Link href="/my-profile">
                            <a>
                                <i className="fa fa-user-circle"/>
                                <span className="nav-label">My Profile</span>
                            </a>
                        </Link>

                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default SideBar