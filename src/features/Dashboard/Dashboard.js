import React, { useEffect, useState } from 'react';
import '../../Styles/Dashboard.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Layout } from './components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { getTopRatedMovies, getTrendingMovies, getMovieDetails, getMovieVideoSource } from '../../data/moviesSlice.js';
import { getMyListMovies, setUserProfile } from '../../data/userSlice.js';
import MovieList from './components/MovieList';
import { MovieModal } from './components/MovieModal';
import { Backdrop, Modal } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../data/hooks/useLoader'
import { Search } from '../Search/components/Search';

function Dashboad(props) {
    const [blackHeader, setBlackHeader] = useState(false);
    const [mute, setMute] = useState(true);
    const [play, setPlay] = useState(true);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { setLoaderSpinning, setShowSearch, setShowMenu } = useLoader();
    const { trendingMovies, topRatedMovies, movieDetail, searchResults } = useSelector(state => state.movies)
    const [modalOpen, setModalOpen] = useState(false);

    // navigate to video player
    const handlePlayVideo = () => {
        navigate(`/video`)
    }

    // Open modal to show movie detail
    const handleModalButton = () => {
        setModalOpen(true)
    }

    // close movie modal
    const handleClose = () => {
        setModalOpen(false)
    }

    // Hide/Show search box and menu bar
    useEffect(() => {
        setShowSearch(true)
        setShowMenu(true)
        setLoaderSpinning(true);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }

        // Get UserProfile, Default video, trending & top rated videos
        const callDispatchMethods = async () => {
            await dispatch(setUserProfile({ ...JSON.parse(localStorage.getItem('userProfile')) }))
            await dispatch(getMyListMovies({ ...JSON.parse(localStorage.getItem('userProfile')) }.myList))
            // Load 'Ad astra' video by default (movie id:419704)
            await dispatch(getMovieDetails(419704));
            await dispatch(getMovieVideoSource(419704));
            // Load trending videos
            await dispatch(getTrendingMovies())
            // Load top rated videos
            await dispatch(getTopRatedMovies())
            setLoaderSpinning(false);
        }
        callDispatchMethods();

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
        <Layout>
            {
                <>
                    {
                        searchResults.length === 0 ?
                            <div className="page">
                                <div className="root">

                                    <div className="player">
                                        <video aloop="1" autoPlay={play} muted={mute} width="100%"
                                            poster="https://i.ytimg.com/vi/htvVnHnroQ4/maxresdefault.jpg"
                                            src="https://mphomeservices.it/videos/Ad%20Astra%20_%20Official%20Trailer%20%5BHD%5D%20_%2020th%20Century%20FOX.mp4"
                                        >
                                        </video>
                                        <div className="video-info">
                                            <div className="synopsis">
                                                <p>
                                                    A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.
                                                </p>
                                                <button className="play-btn" onClick={handlePlayVideo} >
                                                    <i className="Icon fa fa-play play" />
                                                    Play
                                                </button>
                                                <button onClick={handleModalButton}>
                                                    <i className="Icon fa fa-info-circle info-circle" />
                                                    More Info
                                                </button>
                                            </div>
                                        </div>
                                        <div className="video-info-right">
                                            <div
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
                                        <div
                                            className="video-bottom"
                                        >

                                        </div>
                                    </div>
                                </div>
                                {
                                    trendingMovies.length ? <section>
                                        <MovieList isTopRated={false} title={"Trending"} items={trendingMovies} />
                                    </section> : <></>
                                }

                                {
                                    topRatedMovies.length ? <section>
                                        <MovieList isTopRated={true} title={"Top Rated"} items={topRatedMovies} />
                                    </section> : <></>
                                }
                            </div >
                            : <Search />
                    }
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
                            <MovieModal item={movieDetail} handleClose={handleClose} />
                        </div>
                    </Modal >
                </>
            }
        </Layout >
    );
}
export default Dashboad;

