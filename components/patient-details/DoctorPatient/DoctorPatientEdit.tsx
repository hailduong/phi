const DoctorPatientEdit = () => {
    return (
        <div className="row pt-2">
            <div className="col-sm-6 b-r pt-2">
                <form role="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="number" placeholder="" className="form-control"/>
                    </div>
                </form>
            </div>
            <div className="col-sm-6 b-r pt-2">
                <form role="form">
                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows={4} placeholder="" className="form-control"/>
                    </div>
                </form>
            </div>
            <button className="btn btn-sm btn-primary float-left m-t-n-xs update" type="submit">
                <strong>Update</strong>
            </button>
        </div>
    )
}

export default DoctorPatientEdit