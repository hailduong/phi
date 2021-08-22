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


const PatientTabHeading = () => {

    const [activeTabHash, setActiveTabHash] = useState(`#tab-1`)
    const changeTabHash = (tabHash: string) => {
        setActiveTabHash(tabHash)
        if (typeof window !== 'undefined') {
            location.assign(tabHash)
        }
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
                   onClick={()=> changeTabHash(item.tabHash)}
                   data-toggle="tab">{item.tabName}</a>
            </li>
        )
    })

    return <ul className="nav nav-tabs">
        {liList}
    </ul>
}

export default PatientTabHeading