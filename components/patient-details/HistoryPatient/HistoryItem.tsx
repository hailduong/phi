import Image from 'next/image'
import {THistoryEntity} from '../../../services/history/historyTypes'

type TProps = {
    historyData: THistoryEntity
}

const HistoryItem = (props: TProps) => {
    const {historyData} = props
    return (
        <div className="feed-element" key={historyData.id}>
            <a href="#" className="float-left">
                <Image alt="image" height={'29px'} width={'29px'} src={'/img/icon-history.png'}/>
            </a>
            <div className="media-body">
                <div className="float-right from-toDate">
                    {historyData.fromDate} - {historyData.toDate}
                </div>
                <h4>{historyData.name}</h4>
                <br/>
            </div>
            <div>{historyData.descriptions} | {historyData.applicablePopulation}</div>
        </div>
    )
}

export default HistoryItem