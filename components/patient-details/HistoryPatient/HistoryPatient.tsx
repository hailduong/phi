import {useEffect, useState} from 'react'
import HistoryItem from './HistoryItem'
import {useRouter} from 'next/router'
import {THistoryEntity} from '../../../services/history/historyTypes'
import historyService from '../../../services/history/historyService'

export type THistoryData = {
    id: number
    name: string
    fromDate: number
    toDate: number
    descriptions: string
}

type THistory = THistoryData[]

const HistoryPatient = () => {
    const router = useRouter()
    const {patientId} = router.query
    const [historyData, setHistoryData] = useState<THistoryEntity[]>([])
    useEffect(() => {
        (async () => {
            const data = await historyService.getHistory(patientId as string)
            if (data && data.status.code === 200) {
                setHistoryData(data.data)
            }
        })()
    }, [patientId])

    const historyList = historyData.map(history => <HistoryItem historyData={history} key={history.id}/>)
    return (
        <div className="feed-activity-list">
            <div>{historyList}</div>
        </div>
    )
}

export default HistoryPatient