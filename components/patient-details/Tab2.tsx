import Doctor from "./Doctor";

const Tab2 = () => {
    return (
        <div className="tab-pane"
             id="tab-2">
            <Doctor/>
            <div className="feed-activity-list">
                <div className="feed-element pt-3">
                    <a href="#" className="float-left">
                        <img width={"29px"} height={"29px"}
                             src="https://img.icons8.com/ios/50/000000/doctor-male.png"/>
                    </a>
                    <button type="button"
                            className="btn btn-outline-dark float-right">
                        Edit
                    </button>
                    <div className="media-body ">
                        <h4> Bs. Tran Thi Bich Nga</h4>
                        <br/>
                    </div>
                    <div className="">
                        Phone: 0938 54 11 74 <br/>
                        Over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Tab2