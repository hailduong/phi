import {ChangeEvent, useState} from "react";
import authService from "../services/authentication/authService";
import Head from "next/head";
import ChangePasswordSuccessAlert from "../components/login/ChangePasswordSuccessAlert";
import ChangePasswordErrorAlert from "../components/login/ChangePasswordErrorAlert";
import Image from 'next/image'
import styled from "styled-components";
import PasswordError from "../components/login/PasswordError";

const SDivLoginPageWrapper = styled.div`
  .logo {
    transform: scale(2);
  }
`

const ChangePassword = () => {
    // 2. Get value of password
    const [password, setPassword] = useState<string>('')
    const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const [passwordRepeat, setPasswordRepeat] = useState<string>('')
    const handlePasswordRepeatInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordRepeat(event.target.value)
    }

    const [code, setCode] = useState<string>('')
    const handleCodeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value)
    }

    const handleChangePassword = async () => {
        const passwordChange = await authService.changePassword(code, passwordRepeat)
        if (passwordChange?.status?.code === 200) {
            // 'Registered successfully! You will now be redirected to the login page.'
            showChangePasswordSuccessAlert()
            setTimeout(() => {
                navigateToTheLoginPage()
            }, 3000)
        } else if (passwordChange?.error === 400) {
            showChangePasswordErrorAlert()
        }
        // Navigate to the login page after 5 seconds
    }

    const [showChangePasswordSuccess, setShowChangePasswordSuccess] = useState(false)
    const showChangePasswordSuccessAlert = () => {
        setShowChangePasswordSuccess(true)
        setTimeout(() => {
            setShowChangePasswordSuccess(false)
        }, 3000)
    }

    const [showChangePasswordError, setShowChangePasswordError] = useState(false)
    const showChangePasswordErrorAlert = () => {
        setShowChangePasswordError(true)
        setTimeout(() => {
            setShowChangePasswordError(false)
        }, 3000)
    }

    const [showPasswordInvalid, setShowPasswordInvalid] = useState(false)
    const showPasswordInvalidAlert = () => {
        setShowPasswordInvalid(true)
        setTimeout(() => {
            setShowPasswordInvalid(false)
        }, 3000)
    }

    // 4. If success, navigate to the `patient` page
    const navigateToTheLoginPage = () => {
        location.assign('/login')
    }

    const validate = () => {
        let isValid = true

        if (password !== passwordRepeat) {
            isValid = false
            showPasswordInvalidAlert()
        }

        let passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

        if (!passwordRegex.test(passwordRepeat.trim())) {
            isValid = false
            showPasswordInvalidAlert()
        }

        if (isValid) {
            handleChangePassword()
        }
    }

    return (
        <SDivLoginPageWrapper className="gray-bg middle-box text-center loginscreen animated fadeInDown">
            <style dangerouslySetInnerHTML={{__html: `body{background: #f3f3f4}`}}/>
            <Head>
                <title>Change Password</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <link href="css/bootstrap.min.css" rel="stylesheet"/>
                <link href="font-awesome/css/font-awesome.css" rel="stylesheet"/>

                <link href="css/animate.css" rel="stylesheet"/>
                <link href="css/style.css" rel="stylesheet"/>
            </Head>

            <div>
                <div className="logo">
                    <Image width={500} height={250} src="/img/logo.png" alt="Phi Logo"/>
                </div>
                <h3>Welcome to PHI</h3>
                <p>A code has been sent to your email. Please check.</p>
                <div className="m-t">
                    <div className="form-group">
                        <input type="password" onChange={handlePasswordInputChange} value={password}
                               className="form-control" placeholder="New Password" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={handlePasswordRepeatInputChange} value={passwordRepeat}
                               className="form-control" placeholder="Re-type new Password" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleCodeInput} value={code}
                               className="form-control" placeholder="Code" required/>
                    </div>
                    <button onClick={validate} className="btn btn-primary block full-width m-b">Submit
                    </button>
                    {showPasswordInvalid && <PasswordError/>}
                    {showChangePasswordSuccess ? <ChangePasswordSuccessAlert/> : null}
                    {showChangePasswordError ? <ChangePasswordErrorAlert/> : null}
                </div>
            </div>
        </SDivLoginPageWrapper>
    )
}

export default ChangePassword