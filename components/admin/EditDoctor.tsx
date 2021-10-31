import newsService from "../../services/newsService/newsService";
import {TNewsEntity} from "../../services/newsService/newsTypes";
import {useRouter} from "next/router";
import {useState} from "react";
import s from "../patient-details/History/index.module.scss";
import styles from "../patients/EditPatient/index.module.scss"

type TProps = {
    newsId: number
    onNewsEdited: () => void
    onCancelEditing: () => void
    newsData: TNewsEntity
}

const EditDoctor = (props: TProps) => {
    const {newsData} = props

    const router = useRouter()
    const {newsId} = router.query

    const [title, setTitle] = useState(newsData.title)
    const [content, setContent] = useState(newsData.content)
    const [fromDate, setFromDate] = useState(new Date(newsData.fromDate * 1000 || Date.now()).toISOString().split('T')[0])
    const [toDate, setToDate] = useState(new Date(newsData.toDate * 1000 || Date.now()).toISOString().split('T')[0])

    const newFromDate = new Date(fromDate)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const fromDateForServer = newFromDate.getTime() / 1000

    const newToDate = new Date(toDate)
    const toDateForInput = newToDate.toISOString().split('T')[0]
    const toDateForServer = newToDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    async function updateNews() {
        if (typeof newsId === 'string') {
            const response = await newsService.updateNews(props.newsId, {
                title,
                fromDate: fromDateForServer,
                toDate: toDateForServer,
                content
            })
            if (response && response.status && response.status.code === 200) {
                props.onNewsEdited()

                if (typeof window !== 'undefined') {
                    const event = new Event('newsEdited')
                    window.dispatchEvent(event)
                }
            }
        }
    }

    const cancelUpdate = () => props.onCancelEditing()

    return <div className={`animated fadeIn ${styles.editPatient}`}>
        <div className={`${s.addHistory} pt-2`}>
            <form role="form">
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                           type="text" placeholder="Input title news"
                           className="form-control"/>
                </div>
            </form>
            <form role="form">
                <div className="form-group">
                    <label>From Date</label>
                    <input value={fromDateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
                           type="date"
                           className="form-control"/>
                </div>
            </form>
            <form role="form">
                <div className="form-group">
                    <label>To Date</label>
                    <input value={toDateForInput} min={fromDateForInput}
                           max={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
                           type="date"
                           className="form-control"/>
                </div>
            </form>
            <form role="form" className={s.description}>
                <div className="form-group">
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}
                              placeholder="Input description"
                              className="form-control"/>
                </div>
            </form>
        </div>
        {shouldShowError && <div className="col-sm-12">
            <div className="alert alert-danger" role="alert">
                Invalid input
            </div>
        </div>}
        <button className="btn btn-primary btn-sm" onClick={updateNews}>
            Update Doctor
        </button>
        <button className="btn btn-default btn-sm update" onClick={cancelUpdate}>
            Cancel
        </button>
    </div>
}

export default EditDoctor