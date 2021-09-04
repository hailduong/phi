import Image from 'next/image'
import {THistoryEntity} from '../../../services/history/historyTypes'

type TProps = {
    historyData: THistoryEntity
    onDeleteHistory: (id: number) => void
}

const HistoryItem = (props: TProps) => {

    const {historyData, onDeleteHistory} = props
    debugger
    const newFromDate = new Date(historyData.fromDate * 1000)
    const newToDate = new Date(historyData.toDate * 1000)
    const fromDateForInput = newFromDate.toISOString().split('T')[0]
    const toDateForInput = newToDate.toISOString().split('T')[0]

    return (
        <div className="grid-container feed-element" key={historyData.id}>
            <div>
                <a href="#" className="float-left">
                    <Image alt="image" height={'29px'} width={'29px'} src={'/img/icons8-history-64.png'}/>
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
                <a className="btn btn-white btn-sm">
                    <i className="fa fa-pencil"/> Edit</a>
                <a className="btn btn-white btn-sm ml-2" onClick={() => {
                    onDeleteHistory(historyData.id)
                }}>
                    <i className="fa fa-trash"/>
                </a>

            </div>
        </div>
    )
}

export default HistoryItem