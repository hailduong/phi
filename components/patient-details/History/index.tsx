import {useEffect, useState} from 'react'
import HistoryItem from './HistoryItem'
import {useRouter} from 'next/router'
import {THistoryEntity} from '../../../services/history/historyTypes'
import historyService from '../../../services/history/historyService'
import {Pagination} from "antd";

const HistoryPatient = () => {
    const router = useRouter()
    const {patientId} = router.query
    const [historyData, setHistoryData] = useState<THistoryEntity[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [shouldShowError, setShouldShowError] = useState(false)

    const handlePageChange = async (pageNo: number) => {
        setPage(pageNo)
        await getData(pageNo)
    }

    const getData = async (pageNo: number = page) => {
        const data = await historyService.getHistory(patientId as string, pageNo)
        if (data && data.status.code === 200) {
            setHistoryData(data.data)
            setTotal(data.total)
        } else if (data?.error === 400) {
            setShouldShowError(true)
            setTimeout(()=>{
                setShouldShowError(false)
            }, 5000)
        }
    }

    useEffect(() => {
        getData(page)
    })

    const handleDeleteHistory = async (historyId: number) => {
        const response = await historyService.deleteHistory(patientId as string, historyId)

        if (response && response.status && response.status.code === 200) {
            getData(page)
        }
    }

    useEffect(() => {
        if (window !== 'undefined') {
            window.addEventListener('historyAdded', () => {
                getData(page)
            })
            window.addEventListener('historyEdited', () => {
                getData(page)
            })
        }
    }, [])

    const historyList = historyData.map(history => <HistoryItem onDeleteHistory={handleDeleteHistory}
                                                                historyData={history} key={history.id}/>)
    return (
        <div className="tab-pane active show" id="tab-1">
            {historyData.length !== 0 ? <div className="feed-activity-list">
                <div>{historyList}</div>
                {shouldShowError && <div className="col-sm-12">
                    <div className="alert alert-danger" role="alert">
                        Data error.
                    </div>
                </div>}
                {total>10 && <div className="text-center mt-3">
                    <Pagination onChange={handlePageChange} total={total}/>
                </div>}
            </div> : <div className="text-center">There is no history.</div>}
        </div>
    )
}

export default HistoryPatient