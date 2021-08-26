const AddDoctor = () => {
    return <div className="row pt-2">
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>First Name</label>
                    <input //value={firstName}
                        //onChange={(e) => setFirstName(e.target.value)}
                        type="text" placeholder="Enter patient's first name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input //value={phone}
                        //onChange={(e) => setPhone(e.target.value)}
                        type="date" placeholder="Enter starting date"
                        className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Descriptions</label>
                    <input //value={password}
                        //onChange={(e) => setPassword(e.target.value)}
                        type="text" placeholder="Enter description"
                        className="form-control"/>
                </div>
            </form>
        </div>
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>Last Name</label>
                    <input //value={lastName}
                        //onChange={(e) => setLastName(e.target.value)}
                        type="text" placeholder="Enter patient's last name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Applicable Population</label>
                    <input //value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                        type="text" placeholder="Enter applicable population" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Frequency</label>
                    <input //value={gender}
                        //onChange={(e) => setGender(e.target.value)}
                        type="number" placeholder="Enter frequency"
                        className="form-control"/>
                </div>
            </form>
        </div>
        {/*{shouldShowError && <div className="col-sm-12">*/}
        {/*    <div className="alert alert-danger" role="alert">*/}
        {/*        Invalid input or email existed*/}
        {/*    </div>*/}

        {/*</div>}*/}
        <button className="btn btn-primary float-left update">
            <strong>Add Allergy</strong>
        </button>
    </div>
}

export default AddDoctor