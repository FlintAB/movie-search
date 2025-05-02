import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
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
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const BASE_URL = 'http://www.omdbapi.com';
    console.log(apiKey);
    console.log(query);
    if (!apiKey) throw new Error('Api key is missing');
    try {
      const response = await fetch(`${BASE_URL}/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Не удалось получить данные: ${response.status}`);
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
          state.movies = [];
        })
        .addCase(searchMovies.rejected, (state, action) => {
          state.status = 'error';
          state.error = action.payload || action.error.message || 'Неизвестная ошибка';
          state.movies = [];
        })
        .addCase(searchMovies.fulfilled, (state, action) => {
          state.status = 'idle';
          state.movies = action.payload.results;
        });
    }
});

export default searchSlice.reducer;