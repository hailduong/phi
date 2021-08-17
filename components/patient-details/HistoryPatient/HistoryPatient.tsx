import Image from "next/image";
import * as url from "url";
import {data} from "browserslist";
import {useEffect, useState} from "react";
import HistoryItem from "./HistoryItem";
import {API_URL} from "../../../env";
import {useRouter} from "next/router";

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
    const { pid } = router.query

    const [historyData, setHistoryData] = useState<THistory>([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/auth/v1/user/history`)
            const data = await response.json()
            if (data.status === '200') {
                setHistoryData(data.data)
            }
        }
        getData()
    }, [])

    const historyList = historyData.map(history => <HistoryItem historyData={history} key={history.id}/>)
    return <div>{historyList}</div>
}

export default HistoryPatient