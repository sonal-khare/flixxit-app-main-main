import React from 'react'
import '../Styles/Home.css'

const HomeMain = ({ data }) => {
    return (
        <div className="home_main_container">
            <div style={{ flexDirection: `${data.direction}` }} className="home_main_content">
                <div className="home_main_content_titles">
                    <h1>{data.title}</h1>
                    <h2>{data.subTitle}</h2>
                </div>
                <div className="home_main_content_media">
                    <img src={data.image} alt={data.alt} />
                    <video autoPlay playsInline muted loop className="home_mid_content_video">
                        <source src={data.video} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default HomeMain