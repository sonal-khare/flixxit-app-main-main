import React, { useState } from 'react';
import '../../Styles/Signin.css'
import { Link, useLocation, useNavigate } from "react-router-dom"
import validator from 'email-validator'
import { TextField } from '@mui/material';
import { useLoader } from '../../data/hooks/useLoader'
import { getMyListMovies, setUserProfile } from '../../data/userSlice.js';
import { useDispatch } from 'react-redux'

const Signin = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    let emailHistory = location.state?.email || ""

    const [email, setEmail] = useState(emailHistory)

    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const [err, setErr] = useState("")
    const { setLoaderSpinning } = useLoader();

    // Email validation
    const handleEmail = (e) => {
        e.preventDefault()

        if (email.length > 6) {
            setEmailErr(false)
        }
        setEmail(e.target.value)
    }

    // Password validation
    const handlePassword = (e) => {
        e.preventDefault()

        if (password.length > 4) {
            setPassErr(false)
        }
        setPassword(e.target.value)
    }

    // Signin click
    const handleLogin = (e) => {
        e.preventDefault()

        setErr("")
        const valid = validator.validate(email)

        if (!valid) {
            setEmailErr(true)
        }

        if (password.length < 4) {
            setPassErr(true)
        }

        else {
            setLoaderSpinning(true)
            // Call generate token API
            fetch(process.env.REACT_APP_SERV_BASE_URL + '/users/generate-token', {
                method: 'GET',
                headers: {
                    useremail: email,
                    password: password
                }
            }).then(res => res.json())
                .then(response => {
                    setLoaderSpinning(false)
                    // valid user or not
                    if (response.message == "Un Authorized") {
                        // clear local storage
                        localStorage.clear()
                        alert("Please enter valid user email & password")
                    } else {
                        // set local storage values
                        localStorage.setItem("userId", response.userId)
                        localStorage.setItem("username", response.username)
                        localStorage.setItem("token", response.token)
                        const userId = localStorage.getItem('userId')
                        // call api to load user profile
                        fetch(process.env.REACT_APP_SERV_BASE_URL + '/profile?id=' + userId, {
                            method: 'GET',
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                            .then(res => res.json())
                            .then(async (response) => {
                                localStorage.setItem('userProfile', JSON.stringify(response.user))
                                await dispatch(setUserProfile(response.user))
                                // Get user mylist movies
                                await dispatch(getMyListMovies(response.user.myList))
                            })
                        // navigate to dashboard
                        navigate("/dashboard")
                    }
                })

        }
    }


    return (
        <div className="full">
            <div className="layer" >
                <img className="logo" src="/static/Images/flixxit-logo.png" alt="logo" />
                <div className="box">
                    <div>
                        <h2>Sign in</h2>
                    </div>
                    {err && <div className="error1">  {err} <Link to="/login" > create a new account. </Link> </div>}
                    <div className="signin_form_input">
                        <TextField
                            variant="filled"
                            label="Email"
                            fullWidth
                            color='warning'
                            type='text'
                            value={email}
                            onChange={handleEmail}
                        />
                        {emailErr && <div className="error"> <div className="errtext">Please enter a valid email address.</div> </div>}
                    </div>
                    <div className="signin_form_input">
                        <TextField
                            variant="filled"
                            label="Password"
                            fullWidth
                            color='warning'
                            type='password'
                            value={password}
                            onChange={handlePassword}
                        />
                        {passErr && <div className="error"> <div className="errtext">Your password must contain between 4 and 60 characters.</div> </div>}
                    </div>
                    <div>
                        <button onClick={handleLogin} className="signin">Sign In</button>
                    </div>
                    <div className="bottom">
                        <div className="forgot">
                            <input className="check" type="checkbox" />
                            <div> Remember Me </div>
                            <div className="help" >  Need Help? </div>
                        </div>
                    </div>
                    <div className="fb">

                        <img src="https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png" alt="fb" className="fbimg" />
                        <div> Login with Facebook </div>
                    </div>
                    <div className="new" >
                        <div className="new1">New To Flixxit?</div>
                        <div onClick={() => navigate("/signup")} className="new2">Sign up now.</div>
                    </div>
                    <div className="secure">
                        <div>This page is protected by Google reCAPTCHA to ensure you're not a bot. <div className="blue">Learn more.</div> </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Signin;