import React, { useEffect, useState } from "react";
import { SingleItem } from "./SingleItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../Styles/ShowMovies.css"

export const ShowMovies = ({ items, title, isTopRated }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { width } = windowDimensions;

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // slider settings
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: width > 900 ? 5 : width > 700 ? 3 : width > 600 ? 2 : 2,
        slidesToScroll: width > 900 ? 5 : width > 700 ? 3 : width > 600 ? 2 : 2,
        cssEase: "linear"
    }

    return (
        <>
            <Slider {...settings} >
                {
                    items.map((item) =>
                    (

                        < SingleItem item={item} />

                    )
                    )
                }
            </Slider>
        </>
    )
}

