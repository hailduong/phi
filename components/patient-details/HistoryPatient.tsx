import Image from "next/image";
import * as url from "url";

type THistory = {
    scrHistory: string
    dateHistory: string
    numberHistory: string
    summaryHistory: string
}[]

const data: THistory = [
    {
        scrHistory: "/img/icon-history.png",
        dateHistory: "12/2/2020 - 13/2/2019",
        numberHistory: "1",
        summaryHistory: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        scrHistory: "/img/icon-history.png",
        dateHistory: "12/2/2021 - 13/2/2010",
        numberHistory: "2",
        summaryHistory: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
]

const HistoryPatient = () => {

    const historyList = data.map(historyItem => {
            return (
                <div className="feed-element" key={historyItem.numberHistory}>
                    <a href="#" className="float-left">
                        <Image alt="image" height={"29px"} width={"29px"} src={historyItem.scrHistory}/>
                    </a>
                    <div className="media-body">
                        <div className="float-right from-toDate">
                            {historyItem.dateHistory}
                        </div>
                        <h4> Lịch sử bệnh án {historyItem.numberHistory}</h4>
                        <br/>
                    </div>
                    <div>{historyItem.summaryHistory}</div>
                </div>
            )
        }
    )
    return <div>{historyList}</div>
}

export default HistoryPatient