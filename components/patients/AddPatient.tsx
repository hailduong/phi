const AddPatient = () => {
    return <div className="row pt-2">
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>Title + Name</label>
                    <input type="text" placeholder="Enter your title and name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" placeholder="Enter your contact number" className="form-control"/>
                </div>
            </form>
        </div>
        <div className="col-sm-6 pt-2">
            <form role="form">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email address" className="form-control"/>
                </div>
            </form>
        </div>
        <button className="btn btn-sm btn-primary float-left m-t-n-xs update" type="submit">
            <strong>Update</strong>
        </button>
    </div>
}

export default AddPatient