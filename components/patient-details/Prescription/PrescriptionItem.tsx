import {TPresData} from "./PrescriptionPatient";
import Image from "next/image";

type TProps = {
    presData: TPresData
}

const PrescriptionItem = (props: TProps) => {
    const {presData} = props

    return (
        <div className="feed-element" key={presData.id}>
            <a href="#" className="float-left">
                <Image alt="image" height={"29px"} width={"29px"} src={"/img/treatment-plan.png"}/>
            </a>
            <div className="media-body">
                <div className="float-right from-toDate">
                    {presData.date}
                </div>
                <h4> {presData.name} </h4>
                <br/>
            </div>
            <div>{presData.descriptions}</div>
        </div>
    )
}

export default PrescriptionItem