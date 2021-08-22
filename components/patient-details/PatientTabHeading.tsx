import {useEffect, useState} from 'react'

type TTab = {
    tabHash: string
    tabName: string
}[]

const data: TTab = [
    {
        tabName: 'History',
        tabHash: `#tab-1`
    },
    // {
    //     tabName: 'Doctors',
    //     tabHash: '#tab-2'
    // },
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
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentTab = location.hash
            setActiveTabHash(currentTab)
        }
    }, [])

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

    return <ul className="nav nav-tabs">
        {liList}
    </ul>
}

export default PatientTabHeading