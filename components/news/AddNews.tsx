import {useRouter} from "next/router";
import {useState} from "react";
import newsService from "../../services/newsService/newsService";
import addPatientStyle from "../patients/AddPatient/index.module.scss";
import s from "../patient-details/History/index.module.scss"

type TProps = {
    onNewsAdded: () => void
    onCancelAdding: () => void
}

const AddNews = (props: TProps) => {

    const router = useRouter()
    const {newsId} = router.query
    // 1. Get form data via state + onChange
    const [title, setTitle] = useState('')
    const [fromDate, setFromDate] = useState(new Date().toISOString())
    const [toDate, setToDate] = useState(new Date().toISOString())
    const [content, setContent] = useState('')

    const newFromDate = new Date(fromDate)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const fromDateForServer = newFromDate.getTime() / 1000

    const newToDate = new Date(toDate)
    const toDateForInput = newToDate.toISOString().split('T')[0]
    const toDateForServer = newToDate.getTime() / 1000

    const [shouldShowError, setShouldShowError] = useState(false)

    // 2. Click on the Add Allergy Button, send the collected data to server using AllergyService
    async function createNews() {
        const myNewsId = typeof newsId === 'string' ? newsId : ''
        const response = await newsService.createNews(newsId as string, {
            title,
            fromDate: fromDateForServer,
            toDate: toDateForServer,
            content
        })
        if (response && response?.status && response.status.code === 200) {
            props.onNewsAdded()

            // Fire event
            if (typeof window !== 'undefined') {
                const event = new Event("newsAdded")
                window.dispatchEvent(event)
            }


        } else if (response && response?.error === 400) {
            setShouldShowError(true)
            setTimeout(() => {
                setShouldShowError(false)
            }, 5000)
        }
    }

    const [isTitleError, setIsTitleError] = useState(false)
    const [isContentError, setIsContentError] = useState(false)

    const validate = () => {
        let isValid = true

        //1. VALIDATE NAME
        if (title.trim().length === 0) {
            isValid = false
            setIsTitleError(true)
        } else setIsTitleError(false)

        if (content.trim().length === 0) {
            isValid = false
            setIsContentError(true)
        } else setIsContentError(false)

        if (isValid) {
            createNews()
        }
    }

    const cancelAdd = () => props.onCancelAdding()

    return (
        <div className={`${addPatientStyle.addPatient} animated fadeIn`}>
            <form role="form" className={s.addHistory}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                           type="text" placeholder="Input title news"
                           className={`form-control ${isTitleError ? 'is-invalid' : 'is-valid'}`}/>
                    {isTitleError ? <div className="invalid-feedback">
                        Name cannot be blank!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label>From Date</label>
                    <input value={fromDateForInput} max={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
                           type="date"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>To Date</label>
                    <input value={toDateForInput} min={fromDateForInput}
                           max={new Date(Date.now()).toISOString().split('T')[0]}
                           onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
                           type="date"
                           className="form-control"/>
                </div>
                <div className={`form-group ${s.description}`}>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}
                              placeholder="Input content"
                              className={`form-control  ${isContentError ? 'is-invalid' : 'is-valid'}`}/>
                    {isContentError ? <div className="invalid-feedback">
                        Content can not be blank!
                    </div> : null}
                </div>
            </form>

            {
                shouldShowError && <div className="col-sm-12">
                    <div className="alert alert-danger" role="alert">
                        Invalid input
                    </div>
                </div>
            }
            <button className="btn btn-primary btn-sm" onClick={validate}>
                Add News
            </button>
            <button className="btn btn-default btn-sm update" onClick={cancelAdd}>
                Cancel
            </button>
        </div>
    )
}
export default AddNews