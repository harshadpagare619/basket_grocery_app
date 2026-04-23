import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSearchResults = createAsyncThunk('search/fetchSearchresults', async ( query, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products/search?q=${encodeURIComponent(query)}`, {
            // headers: {
            //     'Cache-Control': 'no-cache',
            //     Pragma: 'no-cache',
            //     Expires: '0',
            // }
        })
        
        return response.data;
    } catch (error){
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
            state.error= null;
        },
        clearResults: (state) => {
            state.results = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.loading = false;
            state.results = action.payload;
        })
        .addCase(fetchSearchResults.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload || "something went wrong";
            state.results = [];
        });
    },
});

export const {setQuery, clearResults} = searchSlice.actions;
export default searchSlice.reducer;
