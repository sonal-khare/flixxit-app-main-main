import React from 'react';
import { useSelector } from 'react-redux'

function VideoPlayer(props) {
    const { movieVideoSource } = useSelector(state => state.movies);

    return (
        <iframe width="100%" title="hello" height="99%" src={`https://www.youtube.com/embed/${movieVideoSource.key}?autoplay=1&showinfo=0&controls=0&mute=0&rel=0`} autoplay="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    );
}

export default VideoPlayer;