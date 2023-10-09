import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJsonData } from "../utilities/APIUtilities";        

// Get trending movies
export const getTrendingMovies = createAsyncThunk('getTrendingMovies', () => {
    return getJsonData('/movies/trending')
})

// Get top rated movies
export const getTopRatedMovies = createAsyncThunk('getTopRatedMovies', () => {
    return getJsonData('/movies/toprated')
})

// Get particular movie details
export const getMovieDetails = createAsyncThunk('getMovieDetails', (id) => {
    return getJsonData("/movies/detail?id=" + id)
})

// Get video for the selected movie
export const getMovieVideoSource = createAsyncThunk('getMovieVideoSource', (id) => {
    return getJsonData("/movies/video?id=" + id)
})

// Get all the movies based on searched text
export const getMoviesBySearchText = createAsyncThunk('getMoviesBySearchText', (searchText) => {
    return getJsonData("/movies/search?searchText=" + searchText)
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        trendingMovies: [],
        topRatedMovies: [],
        movieDetail: {},
        movieVideoSource: {},
        searchResults: []
    },
    extraReducers: (builder) => {

        builder.addCase(getTrendingMovies.pending, (state, action) => {
            state.trendingMovies = []

        })

        builder.addCase(getTrendingMovies.fulfilled, (state, action) => {
            state.trendingMovies = action.payload

        })

        builder.addCase(getTopRatedMovies.pending, (state, action) => {
            state.topRatedMovies = []
        })

        builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
            state.topRatedMovies = action.payload
        })

        builder.addCase(getMovieDetails.pending, (state, action) => {
            state.movieDetail = {}
        })

        builder.addCase(getMovieDetails.fulfilled, (state, action) => {
            state.movieDetail = action.payload
        })

        builder.addCase(getMovieVideoSource.pending, (state, action) => {
            state.movieVideoSource = {}
        })

        builder.addCase(getMovieVideoSource.fulfilled, (state, action) => {
            state.movieVideoSource = action.payload
        })

        builder.addCase(getMoviesBySearchText.fulfilled, (state, action) => {
            state.searchResults = action.payload
        })

    }
})

export default moviesSlice;