import s from './PageHeading.module.scss'

type TProps = {
    pageName: string
}

const PageHeading = (props: TProps) => {
    const {pageName} = props
    return (
        <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-sm-4">
                <h2 className={s.pageName}>{pageName}</h2>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
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