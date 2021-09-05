import {useEffect, useState} from 'react'
import HeaderFooter from '../components/common/HeaderFooter'
import styles from '../styles/Home.module.scss'
import LeftNavigation from '../components/common/LeftNavigation'
import PageHeading from '../components/common/PageHeading'
import authService from '../services/authentication/authService'
import {TDoctorInfoEntity} from '../services/authentication/authType'
import {notification} from 'antd'

export default function PatientDetailsPage() {

    /* Initial Data */
    const initialDoctorData: TDoctorInfoEntity = {
        address: '', email: '', firstName: '', gender: '', id: 0, lastName: '', phone: '', role: '', title: '',
    }
    const [doctorInfo, setDoctorInfo] = useState<TDoctorInfoEntity>(initialDoctorData)
    useEffect(() => {
        const getInitialData = async () => {
            const res = await authService.getMyProfile()
            if (res.status.code === 200) {
                setDoctorInfo(res.data)
            }
        }

        getInitialData()
    }, [])

    /* Bind form data */
    const {address, email, firstName, gender, lastName, phone, role, title} = doctorInfo
    const handleSetData = (fieldName: keyof TDoctorInfoEntity, value: string) => {

        const data: TDoctorInfoEntity = {...doctorInfo}
        Object.assign(data, {[fieldName]: value})

        setDoctorInfo(data)
    }
    const handleSubmitProfileData = async () => {
        const response = await authService.updateMyProfile(doctorInfo)
        if (response.status.code === 200) {
            notification.open({
                message: 'Profile updated',
                type: 'success',
                description:
                    'Your profile has been updated successfully'
            })
        }
    }

    /* Render */
    return (
        <HeaderFooter>
            <main className={styles.main}>
                <div id="wrapper">
                    <LeftNavigation/>
                    <div id="page-wrapper" className="gray-bg">
                        <PageHeading pageName={'My Profile'}/>
                        <div className="wrapper wrapper-content animated fadeInUp">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox">
                                        <div className="ibox-title">
                                            <h5>My Profile</h5>
                                        </div>
                                        <div className="ibox-content">
                                            <div className="form">
                                                <div className="form-group row">
                                                    <div className="form-group col-6">
                                                        <label htmlFor="firstName">First Name</label>
                                                        <input type="text" className="form-control"
                                                               id="firstName" value={firstName}
                                                               onChange={(event) => handleSetData('firstName', event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="lastName">Last Name</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => handleSetData('lastName', event.target.value)}
                                                               id="lastName" value={lastName}/>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="address">Address</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => handleSetData('address', event.target.value)}
                                                               id="address" value={address}/>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="title">Title</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => handleSetData('title', event.target.value)}
                                                               id="title" value={title}/>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="phone">Phone</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => handleSetData('phone', event.target.value)}
                                                               id="phone" value={phone}/>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label>Gender</label>
                                                        <div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio"
                                                                       id="male" name="gender" value="male"
                                                                       onChange={(event) => handleSetData('gender', event.target.value)}
                                                                       checked={gender === 'male'}/>
                                                                <label className="form-check-label"
                                                                       id="female" htmlFor="male">Male</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio"
                                                                       name="gender" value="female"
                                                                       onChange={(event) => handleSetData('gender', event.target.value)}
                                                                       checked={gender === 'female'}/>
                                                                <label className="form-check-label"
                                                                       htmlFor="female">Female</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="email" className="form-control"
                                                               readOnly
                                                               onChange={(event) => handleSetData('email', event.target.value)}
                                                               id="email" value={email}/>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="role">Role</label>
                                                        <input type="text" className="form-control"
                                                               readOnly
                                                               onChange={(event) => handleSetData('role', event.target.value)}
                                                               id="role" value={role}/>
                                                    </div>
                                                </div>
                                                <button type="submit" onClick={handleSubmitProfileData}
                                                        className="btn btn-lg btn-primary">Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </HeaderFooter>
    )
}
