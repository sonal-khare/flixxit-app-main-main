import React from 'react';
import { useEffect } from 'react';
import Header from '../../Dashboard/components/Header';
import { SingleItem } from '../../Dashboard/components/SingleItem';
import "../../../Styles/MyList.css"
import { useState } from 'react';
import HomeFooter from '../../../Components/HomeFooter';
import { useLoader } from '../../../data/hooks/useLoader';
import { useDispatch, useSelector } from 'react-redux'
import { getMyListMovies, setUserProfile } from '../../../data/userSlice';
import { useNavigate } from 'react-router-dom';


const MyList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [blackHeader, setBlackHeader] = useState(false);
    const { myListMovies } = useSelector((state) => state.user)
    const { setLoaderSpinning, setShowSearch, setShowMenu } = useLoader();

    // Hide search box and show menu bar
    useEffect(() => {
        setShowSearch(false);
        setShowMenu(true)
        setLoaderSpinning(true);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
        // Get user details with mylist movies detail
        const callGetMovieDetails = async () => {
            await dispatch(setUserProfile({ ...JSON.parse(localStorage.getItem('userProfile')) }))
            await dispatch(getMyListMovies({ ...JSON.parse(localStorage.getItem('userProfile')) }.myList))
            setLoaderSpinning(false);
        }
        callGetMovieDetails();
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);


    return (
        <div className="bgGrey" >
            < Header black={blackHeader} />
            <h2 className="heading">
                My List
            </h2>
            <div className="list-container">
                {
                    myListMovies?.map((item, i) =>
                        <SingleItem applyClass="listItem" item={item} />)
                }
            </div>
            <HomeFooter />
        </div >

    )
}

export default MyList