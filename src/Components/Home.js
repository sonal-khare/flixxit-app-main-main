import React, { useState } from 'react'
import HomeHeader from './HomeHeader'
import '../Styles/Home.css'
import HomeMain from './HomeMain'
import HomeFAQ from './HomeFAQ'
import { TextField } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeFooter from './HomeFooter'
import validator from 'email-validator'
import { useNavigate } from 'react-router-dom'

// Info for landing page
const data =
    [
        {
            "id": 1,
            "title": "Enjoy on your TV.",
            "subTitle": "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            "image": "/static/Images/tv.png",
            "video": "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
            "alt": "Watch on Flixxit",
            "direction": "row"
        },
        {
            "id": 2,
            "title": "Download your programmes to watch on the offline.",
            "subTitle": "Save your favourites easily and always have something to watch.",
            "image": "/static/Images/mobile.jpg",
            "alt": "Watch on mobile",
            "direction": "row-reverse"
        },
        {
            "id": 3,
            "title": "Watch everywhere.",
            "subTitle": "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
            "image": "/static/Images/imac.png",
            "video": "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v",
            "alt": "TV shows on Flixxit",
            "direction": "row"
        }
    ]

// Landing page - FAQ data
const faq = [
    {
        "id": 1,
        "header": "What is Flixxit?",
        "body": "Flixxit is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!"
    },
    {
        "id": 2,
        "header": "How much does Flixxit cost?",
        "body": "Watch Flixxit on your smartphone, tablet, smart TV, laptop or streaming device, all for one low fixed monthly fee. Plans start from £5.99 a month. No extra costs or contracts."
    },
    {
        "id": 3,
        "header": "Where can I watch?",
        "body": "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Flixxit account to watch instantly on the web at Flixxit.com from your personal computer or on any internet-connected device that offers the Flixxit app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favourite programmes with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Flixxit with you anywhere."
    },
    {
        "id": 4,
        "header": "How do I cancel?",
        "body": "Flixxit is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time."
    },
    {
        "id": 5,
        "header": "What can I watch on Flixxit?",
        "body": "Flixxit has an extensive library of feature films, documentaries, TV programmes, anime, award-winning Flixxit originals, and more. Watch as much as you want, any time you want."
    }
]


const Home = () => {
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState("");
    const [emailValidate, setEmailValidate] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // validate email address format
        if (validator.validate(email)) {
            navigate('/signup', { state: { email: email } });

        } else {
            setEmailValidate(true)
        }
    }

    return (
        <div className="home">
            <HomeHeader />
            {
                data?.map(item => <HomeMain key={item.id} data={item} />)
            }
            <div className="home_FAQ">
                <h1>Frequently Asked Questions</h1>
                {
                    faq?.map(item => <HomeFAQ key={item.id} data={item} />)
                }
                <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
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
                    <button onClick={() => handleSubmit()}>Get Started <NavigateNextIcon className="home-right-arrow" /></button>
                </div>
                {errorMsg &&

                    <div className="error">{errorMsg}</div>

                }
                {emailValidate && <div className="error">Please enter a valid email address.</div>}
            </div>
            <HomeFooter />
        </div >
    )
}

export default Home