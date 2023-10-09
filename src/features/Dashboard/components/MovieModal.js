import { Box, Button, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import "../../../Styles/Movie.css"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getMovieVideoSource } from '../../../data/moviesSlice.js';
import { setUserProfile, updateUserProfileLikes, updateUserProfileDislikes, updateUserProfileMylist, getMyListMovies } from '../../../data/userSlice.js';
import { useLoader } from '../../../data/hooks/useLoader'

export const MovieModal = ({ item, handleClose }) => {
    const [mute, setMute] = useState(true);
    const { movieDetail, movieVideoSource } = useSelector(state => state.movies)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { userProfile } = useSelector(state => state.user);
    const { setLoaderSpinning } = useLoader();

    // Get the movie video source and navigate to video player
    const handlePlayVideo = async () => {
        setLoaderSpinning(true);
        // Get the movie video source
        await dispatch(getMovieVideoSource(movieDetail.id));
        // navigate to video player
        navigate(`/video`)
        setLoaderSpinning(false);
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

    const liked = isLiked(movieDetail.id)
    const disliked = isDisLiked(movieDetail.id)
    const inList = isInList(movieDetail.id)

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
        movieDetail ?
            <>
                <Box className="reactplayer">
                    <iframe style={{
                        marginTop: '-70px',
                    }} width="100%" title="hello" height="576" src={`https://youtube.com/embed/${movieVideoSource.key}?autoplay=1&showinfo=0&controls=0&mute=${mute}&rel=0`}
                        frameBorder="0" autoPlay="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    <div className="video-info">
                        <div className="synopsis">
                            <button className="play-btn" onClick={handlePlayVideo} >
                                <i className="Icon fa fa-play play" />
                                Play
                            </button>
                            <div className="synopsis-tooltips">
                                {
                                    inList ? <Tooltip title="Add to My List"
                                        className="synopsis-tooltips-single"
                                        placement="top"
                                        arrow
                                    >

                                        <AddIcon onClick={() => handleAddToList(movieDetail.id)} className="highlight" style={{ fontSize: '24px' }} />

                                    </Tooltip>
                                        :
                                        <Tooltip title="Add to My List"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <AddIcon onClick={() => handleAddToList(movieDetail.id)} style={{ fontSize: '24px' }} />
                                        </Tooltip>
                                }


                                {

                                    liked ? <Tooltip title="Like"
                                        className="synopsis-tooltips-single"
                                        placement="top"
                                        arrow
                                    >

                                        <ThumbUpAltOutlinedIcon onClick={() => handleLike(movieDetail.id)} className="highlight" style={{ fontSize: '24px' }} />

                                    </Tooltip>
                                        :
                                        <Tooltip title="Like"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <ThumbUpAltOutlinedIcon onClick={() => handleLike(movieDetail.id)} style={{ fontSize: '24px' }} />
                                        </Tooltip>


                                }

                                {

                                    disliked ?

                                        <Tooltip title="Dislike"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <ThumbDownAltOutlinedIcon onClick={() => handleDislike(movieDetail.id)} className="highlight" style={{ fontSize: '24px' }} />
                                        </Tooltip> :

                                        <Tooltip title="Dislike"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <ThumbDownAltOutlinedIcon onClick={() => handleDislike(movieDetail.id)} style={{ fontSize: '24px' }} />
                                        </Tooltip>


                                }



                            </div>
                        </div>
                    </div>
                    <div className="close" onClick={handleClose}>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <div className="video-info-right">
                        <div
                            className="video-info-right-volume"
                            onClick={() => setMute(prev => !prev)}
                        >
                            {!mute ? <VolumeUpIcon style={{
                                color: '#fff',
                                cursor: 'pointer'
                            }} />
                                :
                                <VolumeOffIcon style={{
                                    color: '#fff',
                                    cursor: 'pointer'
                                }} />}
                        </div>
                    </div>
                </Box>
                <Box className="wrapper">
                    <div className="movie-info">
                        <div className="movie-info-left">
                            <div className="movie-info-left_-first">
                                <p className="movie-info-left-first_green">{`${movieDetail.vote_average * 10}% Match `}</p>
                            </div>
                            <div className="movie-info-left-first">
                                <p>{movieDetail.overview}</p>
                            </div>
                        </div>
                        <div className="movie-info-right">
                            <div>
                                <span>Genres:</span>
                                {
                                    movieDetail.genres ? (movieDetail.genres.length !== 0 && movieDetail.genres.map((genre, i) => {
                                        return (
                                            <span className="movie_info_right_links" key={genre.id}>{genre.name}{`${movieDetail.genres.length - 1 !== i ? ',' : ''}`}</span>
                                        )
                                    })) : <span></span>
                                }</div>

                        </div>
                    </div >
                    {
                        movieDetail.type !== "Scripted" &&
                        <div className="footer">
                            <h1>
                                Title: {movieDetail.title}
                            </h1>
                        </div>
                    }
                </Box >
            </> :
            <></>
    )
}
