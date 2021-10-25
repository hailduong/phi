import Head from "next/head";
import {ChangeEvent, useState} from "react";
import authService from "../services/authentication/authService";
import SignUpSuccessAlert from "../components/login/SignUpSuccessAlert";
import SignUpErrorAlert from "../components/login/SignUpErrorAlert";

const SignUp = () => {
    const [userName, setUserName] = useState<string>('')
    const handleUserNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }

    // 2. Get value of password
    const [password, setPassword] = useState<string>('')
    const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    // 3. Click sign in > send data
    const handleClickSignUp = async () => {
        // Send data to server
        const data = await authService.signup(userName, password)

        if (data?.status?.code === 200) {
            // 'Registered successfully! You will now be redirected to the login page.'
            showSignUpSuccessAlert()
            // Navigate to the login page after 5 seconds
            setTimeout(() => {
                navigateToTheLoginPage()
            }, 3000)
        }
        else {
            //Show alert if error
            showSignUpErrorAlert()
        }
    }

    const [showSignUpSuccess, setShowSignUpSuccess] = useState(false)
    const showSignUpSuccessAlert = () => {
        setShowSignUpSuccess(true)
        setTimeout(() => {
            setShowSignUpSuccess(false)
        }, 5000)
    }

    const [showSignUpError, setShowSignUpError] = useState(false)
    const showSignUpErrorAlert = () => {
        setShowSignUpError(true)
        setTimeout(() => {
            setShowSignUpError(false)
        }, 5000)
    }

    // 4. If success, navigate to the `patient` page
    const navigateToTheLoginPage = () => {
        location.assign('/login')
    }
    return (
        <div className="gray-bg middle-box text-center loginscreen animated fadeInDown">
            <style dangerouslySetInnerHTML={{__html: `body{background: #f3f3f4}`}}/>
            <Head>
                <title>Login</title>
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
                <div>
                    <h1 className="logo-name">PHI</h1>
                </div>
                <h3>Welcome to PHI</h3>
                <p>Sign up. To see it in action.</p>
                <div className="m-t">
                    <div className="form-group">
                        <input type="email" onChange={handleUserNameInputChange} value={userName}
                               className="form-control" placeholder="Email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={handlePasswordInputChange} value={password}
                               className="form-control" placeholder="Password" required/>
                    </div>
                    <button onClick={handleClickSignUp} className="btn btn-primary block full-width m-b">Sign Up
                    </button>
                    {showSignUpSuccess && <SignUpSuccessAlert/>}
                    {showSignUpError && <SignUpErrorAlert/>}
                </div>
            </div>
        </div>
    )
}

export default SignUp