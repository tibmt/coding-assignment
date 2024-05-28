import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})
// add a separate method for searching movies 
export const fetchSearchResults = createAsyncThunk('search-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})


const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            // Updating movies list with new values
            const mergedArray = [...current(state.movies), ...action.payload.results];
            const uniqueById = new Map();
            mergedArray.forEach(movie => {
                if (!uniqueById.has(movie.id)) {
                    uniqueById.set(movie.id, movie);
                }
            });
            const result = Array.from(uniqueById.values());

            state.movies = result;
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        }).addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.movies = action.payload.results;
            state.fetchStatus = 'success'
        }).addCase(fetchSearchResults.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchSearchResults.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
