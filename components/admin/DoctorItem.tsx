import {TNewsEntity} from "../../services/newsService/newsTypes";
import {useState} from 'react'
import EditDoctor from "./EditDoctor";
import s from "../patients/PatientItem/index.module.scss"
import {Button, Popover, PopoverBody} from "reactstrap";

type TProps = {
    // newsData: TNewsEntity
    // onDeleteNews: (id: number) => void
}

const DoctorItem = (props: TProps) => {

    // const {newsData, onDeleteNews} = props
    // const newFromDate = new Date(newsData.fromDate * 1000 || Date.now())
    // const newToDate = new Date(newsData.toDate * 1000 || Date.now())
    //
    // const fromDateForInput = newFromDate.toISOString().split('T')[0]
    // const toDateForInput = newToDate.toISOString().split('T')[0]
    //
    // const [showEditNews, setShowEditNews] = useState(false)
    // const handleEditNews = () => {
    //     setShowEditNews(!showEditNews)
    // }
    //
    // const handleEdited = () => {
    //     setShowEditNews(false)
    // }
    //
    // const [popoverOpen, setPopoverOpen] = useState(false)
    //
    // const togglePopover = () => setPopoverOpen(!popoverOpen)
    //
    // const cancelEdit = () => {
    //     setShowEditNews(false)
    // }
    return (
        <div className={`grid-container ibox-content ${s.patientItem}`}>
            Doctor Item
            {/*<div className="project-title">*/}
            {/*    <a>{newsData.id} {newsData.title}*/}
            {/*        <br/>*/}
            {/*        <small>{newsData.content} </small>*/}
            {/*    </a>*/}
            {/*</div>*/}
            {/*<div className="project-actions">*/}
            {/*    <div className="media-body">*/}
            {/*        <div className="float-right from-toDate">*/}
            {/*            {fromDateForInput} to {toDateForInput}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    {showEditNews ? null : <a onClick={handleEditNews} className="btn btn-white btn-sm">*/}
            {/*        <i className="fa fa-pencil"/> Edit*/}
            {/*    </a>}*/}
            {/*    /!*</Link>*!/*/}
            {/*    <a id={'confirmDelete' + newsData.id.toString()} onClick={togglePopover}*/}
            {/*       className="btn btn-white btn-sm ml-2">*/}
            {/*        <i className="fa fa-trash"/> Delete*/}
            {/*    </a>*/}
            {/*    <Popover target={'confirmDelete' + newsData.id.toString()} isOpen={popoverOpen} placement={"auto"}>*/}
            {/*        <PopoverBody>*/}
            {/*            <div>Are you sure you want to delete?</div>*/}
            {/*            <div className='grid-container justify-content-center mt-1'>*/}
            {/*                <Button className='btn btn-sm btn-danger' onClick={() => {*/}
            {/*                    onDeleteNews(newsData.id)*/}
            {/*                }}>Delete</Button>*/}
            {/*                <Button className='btn btn-white btn-sm ml-2' onClick={togglePopover}>Cancel</Button>*/}
            {/*            </div>*/}
            {/*        </PopoverBody>*/}
            {/*    </Popover>*/}
            {/*</div>*/}
            {/*{showEditNews ? <EditDoctor newsId={newsData.id} newsData={newsData} onNewsEdited={handleEdited}*/}
            {/*                            onCancelEditing={cancelEdit}/> : null}*/}
        </div>

    )
}

export default DoctorItem
