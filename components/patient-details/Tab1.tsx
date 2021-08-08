import HistoryPatient from "./HistoryPatient";

const Tab1 = ()=> {
    return (
        <div className="tab-pane active show" id="tab-1">
            <div className="feed-activity-list">
                <HistoryPatient/>
            </div>
        </div>
    )
}

export default Tab1