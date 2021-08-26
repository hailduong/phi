import {useEffect, useState} from 'react'
import AddHistory from "./HistoryPatient/AddHistory";
import AddEvent from "./Events/AddEvent";
import AddDoctor from "./DoctorPatient/AddDoctor";
import AddAllergy from "./AllergyPatient/AddAllergy";
import AddPrescription from "./Prescription/AddPrescription";
// import {act} from "react-dom/test-utils";

type TTab = {
    tabHash: string
    tabName: string
}[]

const data: TTab = [
    {
        tabName: 'History',
        tabHash: `#tab-1`
    },
    {
        tabName: 'Doctors',
        tabHash: '#tab-2'
    },
    {
        tabName: 'Allergies',
        tabHash: '#tab-3'
    },
    {
        tabName: 'Events',
        tabHash: '#tab-4'
    },
    {
        tabName: 'Prescription',
        tabHash: '#tab-5'
    }
]

type TProps = {
    onSelectTab: (tabIndex: number) => void
}

const PatientTabHeading = (props: TProps) => {

    const [activeTabHash, setActiveTabHash] = useState(`#tab-1`)
    //Change tab hash
    const changeTabHash = (tabHash: string) => {
        setActiveTabHash(tabHash)

        // Update location
        if (typeof window !== 'undefined') {
            location.assign(tabHash)
        }

        // Output the index
        const tabIndex = data.findIndex(item => item.tabHash === tabHash)

        props.onSelectTab(tabIndex)
    }

    // if (activeTabHash === '#tab-1') {
    //     displayTabName = 'History'
    // } else if (activeTabHash === '#tab-2') {
    //     displayTabName = 'Doctors'
    // } else if (activeTabHash === '#tab-3') {
    //     displayTabName = 'Allergies'
    // } else if (activeTabHash === '#tab-4') {
    //     displayTabName = 'Event'
    // } else if (activeTabHash === '#tab-5') {
    //     displayTabName = 'Prescription'
    // }

    const displayTabName = data.find(item => item.tabHash === activeTabHash)

    // Update the URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentTab = location.hash
            setActiveTabHash(currentTab)
        }
    }, [])
    // Create list of tabs
    const liList = data.map(item => {
        const activeClass = item.tabHash === activeTabHash ? 'active' : ''
        return (
            <li className={activeClass} key={item.tabHash}>
                <a className="nav-link"
                   onClick={() => changeTabHash(item.tabHash)}
                   data-toggle="tab">{item.tabName}</a>
            </li>
        )
    })


    const [showAddButton, setShowAddButton] = useState(false)
    const handleAddButton = () => {
        setShowAddButton(!showAddButton)
    }

    const buttonStyle = (showAddButton) ? 'btn-default' : 'btn-primary'

    return <div>
        <ul className="nav nav-tabs">
            {liList}
            <button className={`${buttonStyle} btn float-right addCustom`} onClick={handleAddButton}>
                <strong>{(showAddButton) ? 'Cancel' : `Add ${displayTabName?.tabName}`}</strong>
            </button>
        </ul>
        {(showAddButton) && activeTabHash === '#tab-1' && <AddHistory/>}
        {(showAddButton) && activeTabHash === '#tab-2' && <AddDoctor/>}
        {(showAddButton) && activeTabHash === '#tab-3' && <AddAllergy/>}
        {(showAddButton) && activeTabHash === '#tab-4' && <AddEvent/>}
        {(showAddButton) && activeTabHash === '#tab-5' && <AddPrescription/>}
    </div>
}

export default PatientTabHeading