import s from './PageHeading.module.scss'
import {useIsAdmin} from "./SideBar";
import Link from 'next/link'

type TProps = {
    pageName: string
}

const PageHeading = (props: TProps) => {
    const {pageName} = props
    const isAdmin = useIsAdmin()
    return (
        <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-sm-4">
                <h2 className={s.pageName}>{pageName}</h2>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        {isAdmin ? <Link href="/doctors">Home</Link> : <Link href="/">Home</Link>}
                    </li>
                    <li className="breadcrumb-item active">
                        <strong>{pageName}</strong>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default PageHeading