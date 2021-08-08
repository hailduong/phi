type TTab = {
    tabNumber: string
    tabName: string
}[]

const data: TTab = [
    {
        tabName: "History",
        tabNumber: "tab-1"
    },
    {
        tabName: "Doctors",
        tabNumber: "tab-2"
    },
    {
        tabName: "Allergies",
        tabNumber: "tab-3"
    },
    {
        tabName: "Events",
        tabNumber: "tab-4"
    },
    {
        tabName: "Prescription",
        tabNumber: "tab-5"
    }
]


const PatientTabHeading = () => {

    const liList = data.map(item => {
        return (
            <li key={item.tabNumber}>
                <a className="nav-link"
                   href={`#${item.tabNumber}`}
                   data-toggle="tab">{item.tabName}</a>
            </li>
        )
    })

    return <ul className="nav nav-tabs">
        {liList}
    </ul>
}

export default PatientTabHeading