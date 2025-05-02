import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TMovie = {
   id: number;
   title: string;
   poster_path: string | null;
   release_date: string;
   vote_average: number;
}

type TSeachFormState = {
   movies: TMovie[];
   status: 'idle' | 'loading' | 'error';
   error: string | null;
   query: string;
};

const initialState: TSeachFormState = {
   movies: [],
   status: 'idle',
   error: null,
   query: '',
};

export const searchMovies = createAsyncThunk<{ results: TMovie[] }, string, { rejectValue: string }>(
  "search/Movies",
  async (query: string, { rejectWithValue }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Server error!');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const searchSlice = createSlice({
   name: "searchFilm",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
        .addCase(searchMovies.pending, (state, action) => {
          state.status = 'loading';
          state.error = null;
          state.query = action.meta.arg;
        })
        .addCase(searchMovies.rejected, (state, action) => {
          state.status = 'error';
          state.error = action.payload || action.error.message || 'Неизвестная ошибка';
        })
        .addCase(searchMovies.fulfilled, (state, action) => {
          state.status = 'idle';
          state.movies = action.payload.results;
        });
    }
});

export default searchSlice.reducer;