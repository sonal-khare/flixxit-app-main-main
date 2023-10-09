import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putJsonData, getJsonData } from "../utilities/APIUtilities";

// Update local storage user profile detail
export const setUserProfile = createAsyncThunk('setUserProfile', (user) => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    return user;
})

// Update plan & payment for the currently logged in user
export const updatePlanPaymentMethod = createAsyncThunk('updatePlanPaymentMethod', (user) => {
    return putJsonData("/profile/planpayment?id=" + user._id, user)
})

// Update liked movies for the currently logged in user
export const updateUserProfileLikes = createAsyncThunk('updateUserProfileLikes', (user) => {
    return putJsonData('/profile/likes?id=' + user._id + '&field=likes', user.likes)
})

// Update disliked movies for the currently logged in user
export const updateUserProfileDislikes = createAsyncThunk('updateUserProfileDislikes', (user) => {
    return putJsonData('/profile/dislikes?id=' + user._id + '&field=dislikes', user.dislikes)
})

// Update mylist movies for the currently logged in user
export const updateUserProfileMylist = createAsyncThunk('updateUserProfileMylist', (user) => {
    return putJsonData('/profile/mylist?id=' + user._id + '&field=myList', user.myList)
})

// Get all the movies detail added to mylist
export const getMyListMovies = createAsyncThunk('getMyListMovies', async (myList) => {
    let tempList = []

    // Promise to load mylist movies detail
    var promises = myList.map(function (id) {
        return getJsonData("/movies/detail?id=" + id).then(response => {
            return response;
        })
    })
    await Promise.all(promises).then(function (results) {
        tempList = [...results]
    })
    return tempList;

})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userProfile: {},
        planPaymentMethod: {},
        myListMovies: []
    },
    extraReducers: (builder) => {

        builder.addCase(setUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })

        builder.addCase(updatePlanPaymentMethod.fulfilled, (state, action) => {

        })


        builder.addCase(updateUserProfileLikes.fulfilled, (state, action) => {

        })

        builder.addCase(updateUserProfileDislikes.fulfilled, (state, action) => {

        })

        builder.addCase(updateUserProfileMylist.fulfilled, (state, action) => {

        })

        builder.addCase(getMyListMovies.fulfilled, (state, action) => {
            state.myListMovies = action.payload
        })
    }
})

export default userSlice;
