import Image from 'next/image'
import {THistoryEntity} from '../../../services/history/historyTypes'
import {useState} from 'react'
import EditHistory from './EditHistory'
import s from './index.module.scss'
import {Button, Popover, PopoverBody} from "reactstrap";

type TProps = {
    historyData: THistoryEntity
    onDeleteHistory: (id: number) => void
}

const HistoryItem = (props: TProps) => {

    const {historyData, onDeleteHistory} = props
    const newFromDate = new Date(historyData.fromDate * 1000)
    const newToDate = new Date(historyData.toDate * 1000)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const toDateForInput = newToDate.toISOString().split('T')[0]

    const [showEdit, setShowEdit] = useState(false)
    const handleEdit = () => {
        setShowEdit(!showEdit)
    }

    const handleEdited = () => {
        setShowEdit(false)
    }

    const [popoverOpen, setPopoverOpen] = useState(false)

    const togglePopover = () => setPopoverOpen(!popoverOpen)

    return (
        <div className="grid-container feed-element" key={historyData.id}>
            <div>
                <a href="#" className={`float-left mr-1 ${s.icon}`}>
                    <Image alt="image" height={'20px'} width={'20px'} src={'/img/icons8-history-64.png'}/>
                </a>
                <div className="media-body">
                    <h4>{historyData.name}</h4>
                </div>
                <div>Description: {historyData.descriptions}</div>
            </div>
            <div className="project-actions">
                <div className="media-body">
                    <div className="float-right from-toDate">
                        {fromDateForInput} to {toDateForInput}
                    </div>
                </div>
                {showEdit ? null : <a className="btn btn-white btn-sm" onClick={handleEdit}>
                    <i className="fa fa-pencil"/> Edit</a>}
                <a id={"Delete" + historyData.id.toString()} onClick={togglePopover}
                   className="btn btn-white btn-sm ml-2">
                    <i className="fa fa-trash"/> Delete
                </a>
                <Popover target={"Delete" + historyData.id.toString()} isOpen={popoverOpen} placement={"auto"}>
                    <PopoverBody>
                        Are you sure you want to delete?
                        <div className="grid-container justify-content-center mt-2">
                            <Button className="btn btn-danger btn-sm" onClick={() => {
                                onDeleteHistory(historyData.id)
                            }}>Delete</Button>
                            <Button className="btn btn-sm btn-default ml-2" onClick={togglePopover}>Cancel</Button>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
            <div className="grid-item mt-2">
                {showEdit ? <EditHistory onCancelEditing={handleEdit} historyId={historyData.id}
                                         onHistoryEdited={handleEdited}/> : null}
            </div>
        </div>
    )
}

export default HistoryItem