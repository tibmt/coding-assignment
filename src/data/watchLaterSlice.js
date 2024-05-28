import { createSlice } from "@reduxjs/toolkit"

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState: {
        watchLaterMovies: []
    },
    reducers: {
        addToWatchLater: (state, action) => {
            state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
        },
        removeFromWatchLater: (state, action) => {
            // refactoring - use filter methid
            state.watchLaterMovies.filter(key => key.id !== action.payload.id)
        },
        remveAllWatchLater: (state) => {
            state.watchLaterMovies = []
        },
    },
})

export default watchLaterSlice
