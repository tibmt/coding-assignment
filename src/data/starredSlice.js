import { createSlice } from "@reduxjs/toolkit"

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: []
    },
    reducers: {
        starMovie: (state, action) => {
            state.starredMovies = [action.payload, ...state.starredMovies]
        },
        unstarMovie: (state, action) => {
            // refactoring - use filter methid
            state.starredMovies = state.starredMovies.filter(key => key.id !== action.payload.id)
        },
        clearAllStarred: (state) => {
            state.starredMovies = []
        },
    },
})

export default starredSlice
