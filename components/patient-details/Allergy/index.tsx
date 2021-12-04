import {useEffect, useState} from 'react'
import AllergyItem from './AllergyItem'
import allergyService from '../../../services/allergyService/allergyService'
import {useRouter} from 'next/router'
import {Pagination} from "antd";
import {TAllergyEntity} from "../../../services/allergyService/allergyTypes";

const Allergy = () => {
    const router = useRouter()
    const {patientId = ''} = router.query

    const [allergyData, setAllergyData] = useState<TAllergyEntity[]>([])

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const [shouldShowError, setShouldShowError] = useState(false)

    const handlePageChange = async (page: number) => {
        setPage(page)
        await getData(page)
    }

    const getData = async (pageNo: number = page) => {
        const data = await allergyService.getAllAllergies(patientId as string, pageNo)
        if (data?.status.code === 200) {
            setAllergyData(data.data)
            setTotal(data.total)
        } else if (data?.error === 400) {
            setShouldShowError(true)
            setTimeout(()=>{
                setShouldShowError(false)
            }, 5000)
        }
    }

    const handleDeleteAllergy = async (allergyId: number) => {
        const response = await allergyService.deleteAllergy(patientId as string, allergyId)

        if (response.status.code === 200) {
            await getData(page)
        }
    }

    useEffect(() => {
        getData(page)
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('allergyAdded', () => {
                getData(page)
            })
            window.addEventListener('allergyEdited', () => {
                getData(page)
            })
        }
    }, [])


    const allergyList = allergyData.map(allergy => <AllergyItem onDeleteAllergy={handleDeleteAllergy}
                                                                key={allergy.id} allergyData={allergy}/>)
    return (
        <div className="tab-pane active show" id="tab-3">
            {allergyData.length !== 0 ? <div className="feed-activity-list">
                {allergyList}
                {total>10 && <div className="text-center mt-3">
                    <Pagination onChange={handlePageChange} total={total}/>
                </div>}
            </div> : <div className="text-center">There is no allergy.</div>
            }
            {shouldShowError && <div className="col-sm-12">
                <div className="alert alert-danger" role="alert">
                    Data error.
                </div>
            </div>}
        </div>
    )
}

export default Allergy