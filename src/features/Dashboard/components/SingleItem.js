import React, { useState, useEffect } from 'react'
import "../../../Styles/ShowMovies.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Backdrop, Modal } from "@mui/material";
import { MovieModal } from "./MovieModal";
import { useNavigate } from 'react-router';
import { getMovieDetails, getMovieVideoSource } from '../../../data/moviesSlice.js';
import { setUserProfile, updateUserProfileLikes, updateUserProfileDislikes, updateUserProfileMylist, getMyListMovies } from '../../../data/userSlice.js';
import { useDispatch, useSelector } from 'react-redux'
import { useLoader } from '../../../data/hooks/useLoader'


const highlightStyle = { backgroundColor: "white", color: "black" }

export const SingleItem = ({ item, applyClass = "" }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { movieVideoSource } = useSelector(state => state.movies);
    const { userProfile } = useSelector(state => state.user);
    const { setLoaderSpinning } = useLoader();

    // Get the movie video source and navigate to video player
    const handlePlayVideo = async () => {
        setLoaderSpinning(true);
        // Get the movie video source
        await dispatch(getMovieVideoSource(item.id));
        // navigate to video player
        navigate(`/video`)
        setLoaderSpinning(false);
    }

    // Open modal to show movie detail
    const handleModalButton = async () => {
        setLoaderSpinning(true);
        await dispatch(getMovieDetails(item.id));
        await dispatch(getMovieVideoSource(item.id));
        setModalOpen(true)
        setLoaderSpinning(false);

    }

    // close modal
    const handleClose = () => {
        setModalOpen(false)
    }

    // check movie is liked or not
    const isLiked = (id) => {
        return userProfile.likes && userProfile.likes.length > 0 ? userProfile.likes.includes(id) : false;
    }

    // check movie is disliked or not
    const isDisLiked = (id) => {
        return userProfile.dislikes && userProfile.dislikes.length > 0 ? userProfile.dislikes.includes(id) : false;
    }

    // check movie is added to mylist or not
    const isInList = (id) => {
        return userProfile.myList && userProfile.myList.length > 0 ? userProfile.myList.includes(id) : false;
    }

    const liked = isLiked(item.id)
    const disliked = isDisLiked(item.id)
    const inList = isInList(item.id)

    // update like to user profile on like icon click
    const handleLike = async (movieId) => {
        let obj = {};
        obj._id = userProfile._id;
        obj.useremail = userProfile.useremail;
        obj.username = userProfile.username;
        obj.password = userProfile.password;
        let tempLikes = [...userProfile.likes]
        let isExist = tempLikes && tempLikes.filter(x => x === movieId).length > 0 ? true : false;
        let filteredLikes = tempLikes ? tempLikes.filter(x => x !== movieId) : [];
        let newLikes = !isExist ? [...tempLikes, movieId] : [...filteredLikes];
        obj.likes = [...newLikes];
        obj.dislikes = [...userProfile.dislikes];
        obj.myList = [...userProfile.myList];
        obj.plan = [...userProfile.plan];
        obj.paymentmethod = [...userProfile.paymentmethod];
        await dispatch(updateUserProfileLikes(obj))
        await dispatch(setUserProfile(obj));
    }

    // update dislike to user profile on dislike icon click
    const handleDislike = async (movieId) => {
        let obj = {};
        obj._id = userProfile._id;
        obj.useremail = userProfile.useremail;
        obj.username = userProfile.username;
        obj.password = userProfile.password;
        let tempDislikes = [...userProfile.dislikes]
        let isDisLikeExist = tempDislikes && tempDislikes.filter(x => x === movieId).length > 0 ? true : false;
        let filteredDisLikes = tempDislikes ? tempDislikes.filter(x => x !== movieId) : [];
        let newDislikes = !isDisLikeExist ? [...tempDislikes, movieId] : [...filteredDisLikes];
        obj.likes = [...userProfile.likes];
        obj.dislikes = [...newDislikes];
        obj.myList = [...userProfile.myList];
        obj.plan = [...userProfile.plan];
        obj.paymentmethod = [...userProfile.paymentmethod];
        await dispatch(updateUserProfileDislikes(obj))
        await dispatch(setUserProfile(obj));
    }

    // update mylist to user profile on add icon click
    const handleAddToList = async (movieId) => {
        let obj = {};
        obj._id = userProfile._id;
        obj.useremail = userProfile.useremail;
        obj.username = userProfile.username;
        obj.password = userProfile.password;
        let tempMylist = [...userProfile.myList]
        let isMylistExist = tempMylist && tempMylist.filter(x => x === movieId).length > 0 ? true : false;
        let filteredMylist = tempMylist ? tempMylist.filter(x => x !== movieId) : [];
        let newMylist = !isMylistExist ? [...tempMylist, movieId] : [...filteredMylist];
        obj.likes = [...userProfile.likes];
        obj.dislikes = [...userProfile.dislikes];
        obj.myList = [...newMylist];
        obj.plan = [...userProfile.plan];
        obj.paymentmethod = [...userProfile.paymentmethod];
        await dispatch(updateUserProfileMylist(obj))
        await dispatch(getMyListMovies(obj.myList))
        dispatch(setUserProfile(obj));
    }


    return (
        <>
            <div className={`${"card-wrapper"} ${applyClass}`}>
                <div className="card">
                    <div className="card-image" >
                        <img alt="movie poster" src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                    </div>
                    <ul className="icons">
                        <li onClick={() => handlePlayVideo(item.id)}><PlayArrowIcon />  </li>
                        {

                            inList ?
                                <li style={highlightStyle} onClick={() => handleAddToList(item.id)}><AddIcon /></li> :
                                <li onClick={() => handleAddToList(item.id)}><AddIcon /> </li>
                        }
                        {

                            liked ?
                                <li style={highlightStyle} onClick={() => handleLike(item.id)}><ThumbUpAltIcon /> </li> :
                                <li onClick={() => handleLike(item.id)}><ThumbUpAltIcon /> </li>
                        }

                        {

                            disliked ?
                                <li style={highlightStyle} onClick={() => handleDislike(item.id)}><ThumbDownAltIcon /> </li> :
                                <li onClick={() => handleDislike(item.id)}><ThumbDownAltIcon /> </li>
                        }

                    </ul>
                    <div className="details" >
                        <div className="btm">
                            <div className="btmleft">
                                <div  >
                                    Votes: {item.vote_average}
                                </div>
                                <div>
                                    {item.original_title}
                                </div>
                            </div>
                            <div className="btmright">
                                <div onClick={() => {
                                    handleModalButton()
                                }}> <ExpandMoreIcon /></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="root"  >
                    <MovieModal item={item} handleClose={handleClose} />
                </div>
            </Modal >
        </>
    )
}
