import {useEffect, useState} from 'react'
import AllergyItem from './AllergyItem'
import allergyService from '../../../services/allergyService/allergyService'
import {useRouter} from 'next/router'

export type TAllergyData = {
    id: number
    name: string
    descriptions: string
}

type TAllergy = TAllergyData[]

const AllergyPatient = () => {
    const router = useRouter()
    const {patientId = ''} = router.query

    const [allergyData, setAllergyData] = useState<TAllergy>([])
    useEffect(() => {
        const getData = async () => {
            const data = await allergyService.getAllAllergies(patientId as string)
            if (data?.status.code === 200) {
                setAllergyData(data.data)
            }
        }
        getData()
    }, [patientId])
    const allergyList = allergyData.map(allergy => <AllergyItem key={allergy.id} allergyData={allergy}/>)
    return <div>{allergyList}</div>
}

export default AllergyPatient