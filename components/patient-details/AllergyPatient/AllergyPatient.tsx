import {useEffect, useState} from "react";
import AllergyItem from "./AllergyItem";
import {API_URL} from "../../../env";

export type TAllergyData = {
    id: number
    name: string
    descriptions: string
}

type TAllergy = TAllergyData[]

const AllergyPatient = () => {
    const [allergyData, setAllergyData] = useState<TAllergy>([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/auth/v1/user/allergy`)
            const data = await response.json()
            if (data.status === "200") {
                setAllergyData(data.data)
            }
        }
        getData()
    }, [])
    const allergyList = allergyData.map(allergy => <AllergyItem key={allergy.id} allergyData={allergy}/>)
    return <div>{allergyList}</div>
}

export default AllergyPatient