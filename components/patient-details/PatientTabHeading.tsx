import {useEffect, useState} from 'react'
import AddHistory from "./History/AddHistory";
import AddEvent from "./Events/AddEvent";
import {useIsAdmin} from "../common/SideBar";
import AddAllergy from "./Allergy/AddAllergy";
import AddPrescription from "./Prescription/AddPrescription";


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

    const isAdmin = useIsAdmin()
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

        // TODO: output the tab name instead
        props.onSelectTab(tabIndex)
    }

    const displayTabName = data.find(item => item.tabHash === activeTabHash)

    // Update the URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentTab = location.hash
            currentTab && setActiveTabHash(currentTab)
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

    const handleAdded = () => {
        setShowAddButton(false)
    }

    return <div>
        <ul className="nav nav-tabs">
            {liList}
            {!isAdmin && !showAddButton &&
                <button className={`${buttonStyle} btn-sm btn float-right addCustom`} onClick={handleAddButton}>
                    Add {displayTabName?.tabName}
                </button>}
        </ul>
        {(showAddButton) && activeTabHash === '#tab-1' && <AddHistory onCancelAdding={handleAddButton} onHistoryAdded={handleAdded}/>}
        {/*{(showAddButton) && activeTabHash === '#tab-2' && <AddDoctor/>}*/}
        {(showAddButton) && activeTabHash === '#tab-3' && <AddAllergy onCancelAdding={handleAddButton} onAllergyAdded={handleAdded}/>}
        {(showAddButton) && activeTabHash === '#tab-4' &&
        <AddEvent onCancelAdding={handleAddButton} onEventAdded={handleAdded}/>}
        {(showAddButton) && activeTabHash === '#tab-5' && <AddPrescription onCancelAdding={handleAddButton} onPrescriptionAdded={handleAdded}/>}
    </div>
}

export default PatientTabHeading