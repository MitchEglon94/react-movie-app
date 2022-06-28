import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=4503e42f5762f850ada999d307bfc5f9&language=en-US&page=1`
  );
  const data = response.json();

  return data;
});

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload.results);
        state.list = action.payload.results;
      });
  },
});

export const selectMovie = (state) => state.movie.list;

export default movieSlice.reducer;
