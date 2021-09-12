import {useEffect, useState} from 'react'
import AllergyItem from './AllergyItem'
import allergyService from '../../../services/allergyService/allergyService'
import {useRouter} from 'next/router'

export type TAllergyData = {
    id: number
    name: string
    date: number
    descriptions: string
}

type TAllergy = TAllergyData[]

const Allergy = () => {
    const router = useRouter()
    const {patientId = ''} = router.query

    const [allergyData, setAllergyData] = useState<TAllergy>([])
    const getData = async () => {
        const data = await allergyService.getAllAllergies(patientId as string)
        if (data?.status.code === 200) {
            setAllergyData(data.data)
        }
    }

    const handleDeleteAllergy = async (allergyId: number) => {
        const response = await allergyService.deleteAllergy(patientId as string, allergyId)

        if (response.status.code === 200) {
            getData()
        }
    }

    useEffect(() => {
        getData()
    }, [patientId])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('allergyAdded', () => {
                getData()
            })
            window.addEventListener('allergyEdited', () => {
                getData()
            })
        }
    }, [])


    const allergyList = allergyData.map(allergy => <AllergyItem onDeleteAllergy={handleDeleteAllergy}
                                                                key={allergy.id} allergyData={allergy}/>)
    return (
        <div className="tab-pane active show" id="tab-3">
            <div className="feed-activity-list">
                <div>{allergyList}</div>
            </div>
        </div>
    )
}

export default Allergy