import React, { useState } from 'react'
import '../Styles/Home.css'
import { TextField } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import validator from 'email-validator'
import { useNavigate } from 'react-router-dom'

const HomeHeader = () => {
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState("");
    const [emailValidate, setEmailValidate] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // validate valid email format or not
        if (validator.validate(email)) {
            navigate('/signup', { state: { email: email } });

        } else {
            setEmailValidate(true)
        }
    }


    const handleClick = () => {
        navigate('/signin', { state: email });
    }

    return (
        <div className="cover_container">
            <img src="/static/Images/bg_main.jpg" alt="cover" className="cover_image" />
            <div className="cover_content">
                <div className="cover_content_header">
                    <img src="/static/Images/flixxit-logo.png" alt="logo" />
                    <button onClick={handleClick} className="sign_in_btn" >Sign In</button>
                </div>
                <div className="cover_content_register">
                    <h1>Unlimited movies, TV <br /> shows and more</h1>
                    <h3>Watch anywhere. Cancel anytime</h3>
                    <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
                </div>
                <div className="cover_content_get_started">
                    <div>
                        <TextField
                            variant="filled"
                            label="Email address"
                            className="input"
                            color='secondary'
                            type='email'
                            value={email}
                            onChange={(e) => {

                                setEmail(e.target.value)
                                setErrorMsg("")
                            }}

                        />
                    </div>
                    <button onClick={() => handleSubmit()}>Get Started<NavigateNextIcon className="home-right-arrow" /></button>
                </div>
                {errorMsg &&

                    <div className="error">{errorMsg}</div>

                }
                {emailValidate && <div className="error">Please enter a valid email address.</div>}
            </div>
        </div>
    )
}

export default HomeHeader